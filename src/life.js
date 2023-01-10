class Life {

    #columns;
    #rows;
    #grid;

    constructor(columns, rows) {
        this.#columns = columns;
        this.#rows = rows;
        this.#grid = Life.#newGrid(columns, rows);
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

    setCellState([col, row], state) {
        [col, row] = this.#getEquivalentCoord(col, row);
        Life.#setCellState(this.#grid, col, row, state);
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

    #getEquivalentCoord(col, row) {
        if (col >= this.columns) col %= this.columns;
        if (row >= this.rows) row %= this.rows;

        if (col < 0) col = this.columns + col;
        if (row < 0) row = this.rows + row;

        return [col, row];
    }

    #getLivingNeighborCount(cellCol, cellRow) {
        const neighbors = [];
        for (let col = cellCol - 1; col <= cellCol + 1; col++) {
            for (let row = cellRow - 1; row <= cellRow + 1; row++) {
                if (this.isCellAlive([col, row]) && !(col === cellCol && row === cellRow)) {
                    neighbors.push(true);
                }
            }
        }
        return neighbors.length;
    }
}

export { Life };