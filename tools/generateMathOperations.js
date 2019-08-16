'use strict';

const fs = require('fs');

const operators = [
  // Arithmetic operators
  ['+', 'add'],
  ['-', 'sub', 'subtract'],
  ['*', 'mul', 'multiply'],
  ['/', 'div', 'divide'],
  ['%', 'mod', 'modulus'],
  // Bitwise operators
  ['&', 'and'],
  ['|', 'or'],
  ['^', 'xor'],
  ['<<', 'leftShift'],
  ['>>', 'signPropagatingRightShift'],
  ['>>>', 'rightShift', 'zeroFillRightShift']
];

const methods = [['~', 'not']];
[
  'abs',
  'acos',
  'acosh',
  'asin',
  'asinh',
  'atan',
  'atanh',
  'cbrt',
  'ceil',
  'clz32',
  'cos',
  'cosh',
  'exp',
  'expm1',
  'floor',
  'fround',
  'log',
  'log1p',
  'log10',
  'log2',
  'round',
  'sign',
  'sin',
  'sinh',
  'sqrt',
  'tan',
  'tanh',
  'trunc'
].forEach(function (mathMethod) {
  methods.push([`Math.${mathMethod}`, mathMethod]);
});

const methodsWithArgs = [['Math.pow', 1, 'pow']];

function fillTemplateFunction(template, values) {
  for (const value in values) {
    template = template.replace(new RegExp(`%${value}%`, 'g'), values[value]);
  }
  return template;
}

const inplaceOperator = `
  AbstractMatrix.prototype.%name% = function %name%(value) {
    if (typeof value === 'number') return this.%name%S(value);
    return this.%name%M(value);
  };
`;

const inplaceOperatorScalar = `
  AbstractMatrix.prototype.%name% = function %name%(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) %op% value);
      }
    }
    return this;
  };
`;

const inplaceOperatorMatrix = `
  AbstractMatrix.prototype.%name% = function %name%(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) %op% matrix.get(i, j));
      }
    }
    return this;
  };
`;

const staticOperator = `
  AbstractMatrix.%name% = function %name%(matrix, value) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.%name%(value);
  };
`;

const inplaceMethod = `
  AbstractMatrix.prototype.%name% = function %name%() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, %method%(this.get(i, j)));
      }
    }
    return this;
  };
`;

const staticMethod = `
  AbstractMatrix.%name% = function %name%(matrix) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.%name%();
  };
`;

const inplaceMethodWithArgs = `
  AbstractMatrix.prototype.%name% = function %name%(%args%) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, %method%(this.get(i, j), %args%));
      }
    }
    return this;
  };
`;

const staticMethodWithArgs = `
  AbstractMatrix.%name% = function %name%(matrix, %args%) {
    const newMatrix = new Matrix(matrix);
    return newMatrix.%name%(%args%);
  };
`;

const inplaceMethodWithOneArgScalar = `
  AbstractMatrix.prototype.%name% = function %name%(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, %method%(this.get(i, j), value));
      }
    }
    return this;
  };
`;
const inplaceMethodWithOneArgMatrix = `
  AbstractMatrix.prototype.%name% = function %name%(matrix) {
    matrix = Matrix.checkMatrix(matrix);
    if (this.rows !== matrix.rows ||
      this.columns !== matrix.columns) {
      throw new RangeError('Matrices dimensions must be equal');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.set(i, j, %method%(this.get(i, j), matrix.get(i, j)));
      }
    }
    return this;
  };
`;

const inplaceMethodWithOneArg = `
  AbstractMatrix.prototype.%name% = function %name%(value) {
    if (typeof value === 'number') return this.%name%S(value);
    return this.%name%M(value);
  };
`;

const staticMethodWithOneArg = staticMethodWithArgs;

const mathOperations = ['export function installMathOperations(AbstractMatrix, Matrix) {'];

for (const operator of operators) {
  mathOperations.push(
    fillTemplateFunction(inplaceOperator, {
      name: operator[1],
      op: operator[0]
    })
  );
  mathOperations.push(
    fillTemplateFunction(inplaceOperatorScalar, {
      name: `${operator[1]}S`,
      op: operator[0]
    })
  );
  mathOperations.push(
    fillTemplateFunction(inplaceOperatorMatrix, {
      name: `${operator[1]}M`,
      op: operator[0]
    })
  );
  mathOperations.push(
    fillTemplateFunction(staticOperator, { name: operator[1] })
  );
  for (let i = 2; i < operator.length; i++) {
    mathOperations.push(
      `  AbstractMatrix.prototype.${operator[i]} = AbstractMatrix.prototype.${
        operator[1]
      };\n`
    );
    mathOperations.push(
      `  AbstractMatrix.prototype.${operator[i]}S = AbstractMatrix.prototype.${
        operator[1]
      }S;\n`
    );
    mathOperations.push(
      `  AbstractMatrix.prototype.${operator[i]}M = AbstractMatrix.prototype.${
        operator[1]
      }M;\n`
    );
    mathOperations.push(
      `  AbstractMatrix.${operator[i]} = AbstractMatrix.${operator[1]};\n`
    );
  }
}

for (const method of methods) {
  mathOperations.push(
    fillTemplateFunction(inplaceMethod, {
      name: method[1],
      method: method[0]
    })
  );
  mathOperations.push(
    fillTemplateFunction(staticMethod, {
      name: method[1]
    })
  );
  for (let i = 2; i < method.length; i++) {
    mathOperations.push(
      `  AbstractMatrix.prototype.${method[i]} = AbstractMatrix.prototype.${
        method[1]
      }`
    );
    mathOperations.push(
      `  AbstractMatrix.${method[i]} = AbstractMatrix.${method[1]}`
    );
  }
}

for (const methodWithArg of methodsWithArgs) {
  let args = 'arg0';
  for (let i = 1; i < methodWithArg[1]; i++) {
    args += `, arg${i}`;
  }
  if (methodWithArg[1] !== 1) {
    mathOperations.push(
      fillTemplateFunction(inplaceMethodWithArgs, {
        name: methodWithArg[2],
        method: methodWithArg[0],
        args: args
      })
    );
    mathOperations.push(
      fillTemplateFunction(staticMethodWithArgs, {
        name: methodWithArg[2],
        args: args
      })
    );
    for (let i = 3; i < methodWithArg.length; i++) {
      mathOperations.push(
        `  AbstractMatrix.prototype.${
          methodWithArg[i]
        } = AbstractMatrix.prototype.${methodWithArg[2]}`
      );
      mathOperations.push(
        `  AbstractMatrix.${methodWithArg[i]} = AbstractMatrix.${
          methodWithArg[2]
        }`
      );
    }
  } else {
    const tmplVar = {
      name: methodWithArg[2],
      args: args,
      method: methodWithArg[0]
    };
    mathOperations.push(fillTemplateFunction(staticMethodWithOneArg, tmplVar));
    mathOperations.push(fillTemplateFunction(inplaceMethodWithOneArg, tmplVar));
    tmplVar.name = `${methodWithArg[2]}S`;
    mathOperations.push(
      fillTemplateFunction(inplaceMethodWithOneArgScalar, tmplVar)
    );
    tmplVar.name = `${methodWithArg[2]}M`;
    mathOperations.push(
      fillTemplateFunction(inplaceMethodWithOneArgMatrix, tmplVar)
    );
    for (let i = 3; i < methodWithArg.length; i++) {
      mathOperations.push(
        `  AbstractMatrix.prototype.${
          methodWithArg[i]
        } = AbstractMatrix.prototype.${methodWithArg[2]};\n`
      );
      mathOperations.push(
        `  AbstractMatrix.${methodWithArg[i]} = AbstractMatrix.${
          methodWithArg[2]
        };\n`
      );
      mathOperations.push(
        `  AbstractMatrix.prototype.${
          methodWithArg[i]
        }S = AbstractMatrix.prototype.${methodWithArg[2]}S;\n`
      );
      mathOperations.push(
        `  AbstractMatrix.prototype.${
          methodWithArg[i]
        }M = AbstractMatrix.prototype.${methodWithArg[2]}M;\n`
      );
    }
  }
}

const result = `${mathOperations.join('')}}\n`;
fs.writeFileSync('src/mathOperations.js', result);
