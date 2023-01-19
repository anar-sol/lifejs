class Life {

    #columns;
    #rows;
    #grid;
    #onNextState;

    constructor(columns, rows) {
        this.#columns = columns;
        this.#rows = rows;
        this.#grid = Life.#newGrid(columns, rows);
        this.#onNextState = null;
    }

    static newLife(columns, rows) {
        return new Life(columns, rows);
    }

    static get CELL_STATE_ALIVE() {
        return true;
    }

    static get CELL_STATE_DEAD() {
        return false;
    }

    get columns() {
        return this.#columns;
    }

    get rows() {
        return this.#rows;
    }

    set onNextState(callback) {
        this.#onNextState = callback;
    }

    setCellState([col, row], state) {
        [col, row] = this.#getEquivalentCoord(col, row);
        Life.#setCellState(this.#grid, col, row, state);
        if (this.#onNextState) {
            this.#onNextState(this);
        }
    }

    toggleCellState([col, row]) {
        const newState = this.isCellAlive([col, row]) ? Life.CELL_STATE_DEAD : Life.CELL_STATE_ALIVE;
        this.setCellState([col, row], newState);
    }

    isCellAlive([col, row]) {
        [col, row] = this.#getEquivalentCoord(col, row);
        return this.#grid[col][row];
    }

    nextState() {
        const newGrid = Life.#newGrid(this.columns, this.rows);
        for (let col = 0; col < this.columns; col++) {
            for (let row = 0; row < this.rows; row++) {
                const livingNeighbors = this.#getLivingNeighborCount(col, row);

                if (this.isCellAlive([col, row]) && (livingNeighbors === 2 || livingNeighbors === 3)) {
                    Life.#setCellState(newGrid, col, row, Life.CELL_STATE_ALIVE);
                } else if (!this.isCellAlive([col, row]) && livingNeighbors === 3) {
                    Life.#setCellState(newGrid, col, row, Life.CELL_STATE_ALIVE);
                } else {
                    Life.#setCellState(newGrid, col, row, Life.CELL_STATE_DEAD);
                }
            }
        }
        this.#grid = newGrid;

        if (this.#onNextState) {
            this.#onNextState(this);
        }
    }

    clear() {
        this.#grid = Life.#newGrid(this.columns, this.rows);
        if (this.#onNextState) {
            this.#onNextState(this);
        }
    }

    static #newGrid(columns, rows) {
        const grid = new Array(columns);
        for (let col = 0; col < columns; col++) {
            grid[col] = new Array(rows);
        }
        Life.#initGrid(grid);
        return grid;
    }

    static #initGrid(grid) {
        for (let col = 0; col < grid.length; col++) {
            grid[col].fill(Life.CELL_STATE_DEAD);
        }
    }

    static #setCellState(grid, col, row, state) {
        grid[col][row] = state;
    }

    static #isSameCell(col1, row1, col2, row2) {
        return col1 === col2 && row1 === row2;
    }

    #getEquivalentCoord(col, row) {
        if (col >= this.columns) col %= this.columns;
        if (row >= this.rows) row %= this.rows;

        if (col < 0) col = this.columns + col;
        if (row < 0) row = this.rows + row;

        return [col, row];
    }

    #getLivingNeighborCount(cellCol, cellRow) {
        let livingNeighbors = 0;
        for (let col = cellCol - 1; col <= cellCol + 1; col++) {
            for (let row = cellRow - 1; row <= cellRow + 1; row++) {
                if (!Life.#isSameCell(col, row, cellCol, cellRow)
                    && this.isCellAlive([col, row])) {
                    livingNeighbors++;
                }
            }
        }
        return livingNeighbors;
    }


}

export { Life };