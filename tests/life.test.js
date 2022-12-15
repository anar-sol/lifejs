import { Life } from "../src/life.js";

describe("Life", () => {

    const COLUMNS = 20;
    const ROWS = 15;
    let life;

    beforeEach(() => {
        life = Life.newLife(COLUMNS, ROWS);
    });

    test("has columns and rows properties", () => {
        expect(life.columns).toBe(COLUMNS);
        expect(life.rows).toBe(ROWS);
    });
});