import Matrix from '../..';

describe('Flip column view', () => {
    it('should set and get values', () => {
        const m = Matrix.ones(5, 8);
        const view = m.flipColumnView();

        m.set(0, 3, 5);
        expect(view.get(0, 4)).toBe(5);

        view.set(0, 0, 10);
        expect(m.get(0, 7)).toBe(10);

        expect(view.rows).toBe(5);
        expect(view.columns).toBe(8);
    });
});
