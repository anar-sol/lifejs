import { Life } from "../src/life.js";

const RELATIVE_CELL_TOP_LEFT = 0;
const RELATIVE_CELL_TOP = 1;
const RELATIVE_CELL_TOP_RIGHT = 2;
const RELATIVE_CELL_LEFT = 3;
const RELATIVE_CELL_RIGHT = 4;
const RELATIVE_CELL_BOTTOM_LEFT = 5;
const RELATIVE_CELL_BOTTOM = 6;
const RELATIVE_CELL_BOTTOM_RIGHT = 7;
/**
 * top-left    | top    |    top-right
 * -----------------------------------
 * left        | cell   |        right
 * -----------------------------------
 * bottom-left | bottom | bottom-right
 * 
 * return the cell coordinate relative
 */
function getRelativeCell([col, row], position) {
    switch (position) {
        case RELATIVE_CELL_TOP_LEFT:
            return [col - 1, row - 1];
        case RELATIVE_CELL_TOP:
            return [col, row - 1];
        case RELATIVE_CELL_TOP_RIGHT:
            return [col + 1, row - 1];
        case RELATIVE_CELL_LEFT:
            return [col - 1, row];
        case RELATIVE_CELL_RIGHT:
            return [col + 1, row];
        case RELATIVE_CELL_BOTTOM_LEFT:
            return [col - 1, row + 1];
        case RELATIVE_CELL_BOTTOM:
            return [col, row + 1];
        case RELATIVE_CELL_BOTTOM_RIGHT:
            return [col + 1, row + 1];
    }
}

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

    test("all cells are dead after creation", () => {
        for (let col = 0; col < life.columns; col++) {
            for (let row = 0; row < life.rows; row++) {
                expect(life.isCellAlive([col, row])).toBe(false);
            }
        }
    });

    test("all cells are dead after clear", () => {
        life.setCellState([0, 0], Life.CELL_STATE_ALIVE);
        life.setCellState([life.columns - 1, 0], Life.CELL_STATE_ALIVE);
        life.setCellState([0, life.rows - 1], Life.CELL_STATE_ALIVE);
        life.setCellState([life.columns - 1, life.rows - 1], Life.CELL_STATE_ALIVE);
        life.setCellState([Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)], Life.CELL_STATE_ALIVE);

        life.clear();

        for (let col = 0; col < life.columns; col++) {
            for (let row = 0; row < life.rows; row++) {
                expect(life.isCellAlive([col, row])).toBe(false);
            }
        }
    });

    test("isCellAlive (1, 1)", () => {
        const cell = [1, 1];

        expect(life.isCellAlive(cell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("isCellAlive (0, 0)", () => {
        const cell = [0, 0];

        expect(life.isCellAlive(cell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("isCellAlive (columns - 1, 0)", () => {
        const cell = [life.columns - 1, 0];

        expect(life.isCellAlive(cell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("isCellAlive (0, rows - 1)", () => {
        const cell = [0, life.rows - 1];

        expect(life.isCellAlive(cell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("isCellAlive (columns - 1, rows - 1)", () => {
        const cell = [life.columns - 1, life.rows - 1];

        expect(life.isCellAlive(cell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("left and right edges are stitched together [negative]", () => {
        const cell = [-1, 0];
        const equivalentCell = [life.columns - 1, 0];

        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);
        expect(life.isCellAlive(equivalentCell)).toBe(true);

        life.setCellState(equivalentCell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);
    });

    test("left and right edges are stitched together [positive]", () => {
        const cell = [life.columns, 0];
        const equivalentCell = [0, 0];

        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);
        expect(life.isCellAlive(equivalentCell)).toBe(true);

        life.setCellState(equivalentCell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);
    });

    test("top and bottom edges are stitched together [negative]", () => {
        const cell = [0, -1];
        const equivalentCell = [0, life.rows - 1];

        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);
        expect(life.isCellAlive(equivalentCell)).toBe(true);

        life.setCellState(equivalentCell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);
    });

    test("top and bottom edges are stitched together [positive]", () => {
        const cell = [0, life.rows];
        const equivalentCell = [0, 0];

        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);
        expect(life.isCellAlive(equivalentCell)).toBe(true);

        life.setCellState(equivalentCell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);
    });

    test("top and bottom, left and right edges are stitched together [negative]", () => {
        const cell = [-1, -1];
        const equivalentCell = [life.columns - 1, life.rows - 1];

        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);
        expect(life.isCellAlive(equivalentCell)).toBe(true);

        life.setCellState(equivalentCell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);
    });

    test("top and bottom, left and right edges are stitched together [positive]", () => {
        const cell = [life.columns, life.rows];
        const equivalentCell = [0, 0];

        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        expect(life.isCellAlive(cell)).toBe(true);
        expect(life.isCellAlive(equivalentCell)).toBe(true);

        life.setCellState(equivalentCell, Life.CELL_STATE_DEAD);
        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(equivalentCell)).toBe(false);
    });

    test("toggleCellState", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];

        expect(life.isCellAlive(cell)).toBe(false);

        life.toggleCellState(cell);
        expect(life.isCellAlive(cell)).toBe(true);

        life.toggleCellState(cell);
        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a live cell with 0 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a live cell with 1 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_TOP_LEFT);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a live cell with 2 live neighbors lives", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_TOP_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(true);
    });

    test("next() a live cell with 2 live neighbors lives [on the top edge]", () => {
        const cell = [Math.trunc(life.columns / 2), 0];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_TOP_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(true);
    });

    test("next() a live cell with 3 live neighbors lives", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_TOP_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);
        const right = getRelativeCell(cell, RELATIVE_CELL_RIGHT);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.setCellState(right, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(true);
    });

    test("next() a live cell with 3 live neighbors lives [on the bottom edge]", () => {
        const cell = [Math.trunc(life.columns / 2), life.rows - 1];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_BOTTOM);
        const right = getRelativeCell(cell, RELATIVE_CELL_RIGHT);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.setCellState(right, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(true);
    });

    test("next() a live cell with 4 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_TOP_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);
        const left = getRelativeCell(cell, RELATIVE_CELL_LEFT);
        const right = getRelativeCell(cell, RELATIVE_CELL_RIGHT);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.setCellState(left, Life.CELL_STATE_ALIVE);
        life.setCellState(right, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a live cell with 4 live neighbors dies [on the left edge]", () => {
        const cell = [0, Math.trunc(life.rows / 2)];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_TOP_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);
        const left = getRelativeCell(cell, RELATIVE_CELL_LEFT);
        const right = getRelativeCell(cell, RELATIVE_CELL_RIGHT);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.setCellState(left, Life.CELL_STATE_ALIVE);
        life.setCellState(right, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a live cell with 5 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_TOP_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);
        const topRight = getRelativeCell(cell, RELATIVE_CELL_TOP_RIGHT);
        const left = getRelativeCell(cell, RELATIVE_CELL_LEFT);
        const right = getRelativeCell(cell, RELATIVE_CELL_RIGHT);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.setCellState(topRight, Life.CELL_STATE_ALIVE);
        life.setCellState(left, Life.CELL_STATE_ALIVE);
        life.setCellState(right, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a live cell with 5 live neighbors dies [on the right edge]", () => {
        const cell = [life.columns - 1, Math.trunc(life.rows / 2)];
        const topLeft = getRelativeCell(cell, RELATIVE_CELL_TOP_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);
        const topRight = getRelativeCell(cell, RELATIVE_CELL_TOP_RIGHT);
        const left = getRelativeCell(cell, RELATIVE_CELL_LEFT);
        const right = getRelativeCell(cell, RELATIVE_CELL_RIGHT);

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(topLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.setCellState(topRight, Life.CELL_STATE_ALIVE);
        life.setCellState(left, Life.CELL_STATE_ALIVE);
        life.setCellState(right, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a dead cell with 0 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a dead cell with 1 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const bottomRight = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_RIGHT);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        life.setCellState(bottomRight, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a dead cell with 2 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const bottomRight = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_RIGHT);
        const bottom = getRelativeCell(cell, RELATIVE_CELL_BOTTOM);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        life.setCellState(bottomRight, Life.CELL_STATE_ALIVE);
        life.setCellState(bottom, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a dead cell with 3 live neighbors lives", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const bottomRight = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_RIGHT);
        const bottom = getRelativeCell(cell, RELATIVE_CELL_BOTTOM);
        const bottomLeft = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_LEFT);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        life.setCellState(bottomRight, Life.CELL_STATE_ALIVE);
        life.setCellState(bottom, Life.CELL_STATE_ALIVE);
        life.setCellState(bottomLeft, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(true);
    });

    test("next() a dead cell with 4 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const bottomRight = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_RIGHT);
        const bottom = getRelativeCell(cell, RELATIVE_CELL_BOTTOM);
        const bottomLeft = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        life.setCellState(bottomRight, Life.CELL_STATE_ALIVE);
        life.setCellState(bottom, Life.CELL_STATE_ALIVE);
        life.setCellState(bottomLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() a dead cell with 5 live neighbors dies", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];
        const bottomRight = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_RIGHT);
        const bottom = getRelativeCell(cell, RELATIVE_CELL_BOTTOM);
        const bottomLeft = getRelativeCell(cell, RELATIVE_CELL_BOTTOM_LEFT);
        const top = getRelativeCell(cell, RELATIVE_CELL_TOP);
        const left = getRelativeCell(cell, RELATIVE_CELL_LEFT);

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        life.setCellState(bottomRight, Life.CELL_STATE_ALIVE);
        life.setCellState(bottom, Life.CELL_STATE_ALIVE);
        life.setCellState(bottomLeft, Life.CELL_STATE_ALIVE);
        life.setCellState(top, Life.CELL_STATE_ALIVE);
        life.setCellState(left, Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
    });

    test("next() blinker pattern", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];

        life.setCellState(cell, Life.CELL_STATE_ALIVE);
        life.setCellState(getRelativeCell(cell, RELATIVE_CELL_LEFT), Life.CELL_STATE_ALIVE);
        life.setCellState(getRelativeCell(cell, RELATIVE_CELL_RIGHT), Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(true);
        expect(life.isCellAlive(getRelativeCell(cell, RELATIVE_CELL_LEFT))).toBe(false);
        expect(life.isCellAlive(getRelativeCell(cell, RELATIVE_CELL_RIGHT))).toBe(false);
        expect(life.isCellAlive(getRelativeCell(cell, RELATIVE_CELL_TOP))).toBe(true);
        expect(life.isCellAlive(getRelativeCell(cell, RELATIVE_CELL_BOTTOM))).toBe(true);
    });

    test("next() Tub pattern", () => {
        const cell = [Math.trunc(life.columns / 2), Math.trunc(life.rows / 2)];

        life.setCellState(cell, Life.CELL_STATE_DEAD);
        life.setCellState(getRelativeCell(cell, RELATIVE_CELL_LEFT), Life.CELL_STATE_ALIVE);
        life.setCellState(getRelativeCell(cell, RELATIVE_CELL_RIGHT), Life.CELL_STATE_ALIVE);
        life.setCellState(getRelativeCell(cell, RELATIVE_CELL_TOP), Life.CELL_STATE_ALIVE);
        life.setCellState(getRelativeCell(cell, RELATIVE_CELL_BOTTOM), Life.CELL_STATE_ALIVE);
        life.nextState();

        expect(life.isCellAlive(cell)).toBe(false);
        expect(life.isCellAlive(getRelativeCell(cell, RELATIVE_CELL_LEFT))).toBe(true);
        expect(life.isCellAlive(getRelativeCell(cell, RELATIVE_CELL_RIGHT))).toBe(true);
        expect(life.isCellAlive(getRelativeCell(cell, RELATIVE_CELL_TOP))).toBe(true);
        expect(life.isCellAlive(getRelativeCell(cell, RELATIVE_CELL_BOTTOM))).toBe(true);
    });

    test("onNextState", () => {
        const callback = jest.fn();
        life.onNextState = callback;

        expect(callback).toBeCalledTimes(0);

        life.nextState();
        expect(callback).toBeCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(life);
    });
});