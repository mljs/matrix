import Matrix from '../..';

describe('Flip row view', () => {
    it('should set and get values', () => {
        const m = Matrix.ones(5, 8);
        const view = m.flipRowView();

        m.set(0, 3, 5);
        expect(view.get(4, 3)).toBe(5);

        view.set(0, 0, 10);
        expect(m.get(4, 0)).toBe(10);

        expect(view.rows).toBe(5);
        expect(view.columns).toBe(8);
    });
});
