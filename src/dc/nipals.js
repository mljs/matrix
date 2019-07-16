import { Matrix } from '../matrix';

/**
 * NIPALS
 * @param {Matrix} X
 * @param {*} Y
 * @param {*} u
 *  Geladi, P and Kowalski, B.R. (1986)
 * Partial least squares and regression:
 * a tutorial.
 * Analytica Chimica Acta 185, 1-17.
 */
export default class nipals {
  constructor(X, options = {}) {
    const { Y,
      scaleScores = false } = options;

    let u;
    if (Y) {
      u = Y.getColumnVector(0);
    } else {
      u = X.getColumnVector(0);
    }

    let diff = 1;
    let t, q, w, tOld;

    let counter = 0;
    for (var i = 0; diff > 1e-10; i++) {
      w = X.clone().transpose().mmul(u).div(u.transpose().mmul(u).get(0, 0));
      w = w.div(w.norm());

      t = X.clone().mmul(w).div(w.transpose().mmul(w).get(0, 0));

      if (i > 0) {
        diff = t.clone().sub(tOld).pow(2).sum();
      }
      tOld = t.clone();

      if (Y) {
        q = Y.clone().transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
        q = q.div(q.norm());

        u = Y.mmul(q).div(q.transpose().mmul(q).get(0, 0));
      } else {
        u = t;
      }

      counter++;
      if (counter > 1000) break;
    }
    console.log('iterations:', counter - 1);
    if (Y) {
      let p = X.clone().transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
      p = p.div(p.norm());
      let xResidual = X.clone().sub(t.clone().mmul(p.transpose()));
      let residual = u.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
      let yResidual = Y.clone().sub(t.clone().mulS(residual.get(0, 0)).mmul(q.transpose()));

      this.t = t;
      this.p = p.transpose();
      this.w = w.transpose();
      this.q = q;
      this.u = u;
      this.s = t.transpose().clone().mmul(t);
      this.xResidual = xResidual;
      this.yResidual = yResidual;
      this.betas = residual;
    } else {
      this.w = w.transpose();
      this.s = t.transpose().clone().mmul(t).sqrt();
      if (scaleScores) {
        this.t = t.clone().div(this.s.get(0, 0));
      } else {
        this.t = t;
      }
      this.xResidual = X.clone().sub(t.clone().mmul(w.transpose()));
    }
  }
}
