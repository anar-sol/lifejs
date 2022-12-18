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

    test("next() a live cell with 0 live neighbors dies", () => {
        const cell = {col: Math.trunc(COLUMNS / 2), row: Math.trunc(ROWS / 2)};

        life.setCellState(cell.col, cell.row, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell.col, cell.row)).toBe(false);
    });

    test("next() a live cell with 1 live neighbors dies", () => {
        const cell = {col: Math.trunc(COLUMNS / 2), row: Math.trunc(ROWS / 2)};
        const neighbor = {col: cell.col - 1, row: cell.row};

        life.setCellState(cell.col, cell.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor.col, neighbor.row, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell.col, cell.row)).toBe(false);
    });

    test("next() a live cell with 2 live neighbors lives", () => {
        const cell = {col: Math.trunc(COLUMNS / 2), row: Math.trunc(ROWS / 2)};
        const neighbor1 = {col: cell.col - 1, row: cell.row};
        const neighbor2 = {col: cell.col - 1, row: cell.row - 1};

        life.setCellState(cell.col, cell.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor1.col, neighbor1.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor2.col, neighbor2.row, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell.col, cell.row)).toBe(true);
    });

    test("next() a live cell with 3 live neighbors lives", () => {
        const cell = {col: Math.trunc(COLUMNS / 2), row: Math.trunc(ROWS / 2)};
        const neighbor1 = {col: cell.col - 1, row: cell.row};
        const neighbor2 = {col: cell.col - 1, row: cell.row - 1};
        const neighbor3 = {col: cell.col, row: cell.row - 1};

        life.setCellState(cell.col, cell.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor1.col, neighbor1.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor2.col, neighbor2.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor3.col, neighbor3.row, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell.col, cell.row)).toBe(true);
    });

    test("next() a live cell with 4 live neighbors dies", () => {
        const cell = {col: Math.trunc(COLUMNS / 2), row: Math.trunc(ROWS / 2)};
        const neighbor1 = {col: cell.col - 1, row: cell.row};
        const neighbor2 = {col: cell.col - 1, row: cell.row - 1};
        const neighbor3 = {col: cell.col, row: cell.row - 1};
        const neighbor4 = {col: cell.col + 1, row: cell.row + 1};

        life.setCellState(cell.col, cell.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor1.col, neighbor1.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor2.col, neighbor2.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor3.col, neighbor3.row, Life.CELL_STATE_ALIVE);
        life.setCellState(neighbor4.col, neighbor4.row, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell.col, cell.row)).toBe(false);
    });
});