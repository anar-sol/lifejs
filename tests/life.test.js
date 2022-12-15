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

    test("isCellAlive (1, 1)", () => {
        const col = 1;
        const row = 1;

        expect(life.isCellAlive(col, row)).toBe(false);

        life.setCellState(col, row, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(col, row)).toBe(true);

        life.setCellState(col, row, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(col, row)).toBe(false);
    });

    test("isCellAlive (0, 0)", () => {
        const col = 0;
        const row = 0;

        expect(life.isCellAlive(col, row)).toBe(false);

        life.setCellState(col, row, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(col, row)).toBe(true);

        life.setCellState(col, row, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(col, row)).toBe(false);
    });

    test("isCellAlive (columns - 1, 0)", () => {
        const col = COLUMNS - 1;
        const row = 0;

        expect(life.isCellAlive(col, row)).toBe(false);

        life.setCellState(col, row, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(col, row)).toBe(true);

        life.setCellState(col, row, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(col, row)).toBe(false);
    });

    test("isCellAlive (0, rows - 1)", () => {
        const col = 0;
        const row = ROWS - 1;

        expect(life.isCellAlive(col, row)).toBe(false);

        life.setCellState(col, row, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(col, row)).toBe(true);

        life.setCellState(col, row, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(col, row)).toBe(false);
    });

    test("isCellAlive (columns - 1, rows - 1)", () => {
        const col = COLUMNS - 1;
        const row = ROWS - 1;

        expect(life.isCellAlive(col, row)).toBe(false);

        life.setCellState(col, row, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(col, row)).toBe(true);

        life.setCellState(col, row, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(col, row)).toBe(false);
    });
});