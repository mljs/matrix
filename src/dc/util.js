export function hypotenuse(a, b) {
  let r = 0;
  if (abs(a) > abs(b)) {
    r = b / a;
    return abs(a) * Math.sqrt(1 + r * r);
  }
  if (b !== 0) {
    r = a / b;
    return abs(b) * Math.sqrt(1 + r * r);
  }
  return 0;
}

export function abs(a) {
  if (a >= 0) return a;
  return 0 - a;
}
