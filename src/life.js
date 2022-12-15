class Life {

    static CELL_STATE_ALIVE = true;
    static CELL_STATE_DEAD = false;

    #columns;
    #rows;
    #grid;

    constructor(columns, rows) {
        this.#columns = columns;
        this.#rows = rows;
        this.#initGrid(columns, rows);
    }

    static newLife(columns, rows) {
        return new Life(columns, rows);
    }

    get columns() {
        return this.#columns;
    }

    get rows() {
        return this.#rows;
    }

    setCellState(col, row, state) {
        this.#grid[col][row] = state;
    }

    isCellAlive(col, row) {
        return this.#grid[col][row];
    }

    #initGrid(columns, rows) {
        this.#grid = new Array(columns);
        for (let col = 0; col < columns; col++) {
            this.#grid[col] = new Array(rows);
            this.#grid[col].fill(Life.CELL_STATE_DEAD);
        }
    }
}

export { Life };