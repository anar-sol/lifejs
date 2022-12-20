class Life {

    static CELL_STATE_ALIVE = true;
    static CELL_STATE_DEAD = false;

    #columns;
    #rows;
    #grid;

    constructor(columns, rows) {
        this.#columns = columns;
        this.#rows = rows;
        const grid = this.#newGrid(columns, rows);
        this.#initGrid(grid);
        this.#grid = grid;
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

    setCellState({ col, row }, state) {
        this.#setCellState(this.#grid, col, row, state);
    }

    isCellAlive({ col, row }) {
        return this.#grid[col][row];
    }

    nextState() {
        const newGrid = this.#newGrid(this.#columns, this.#rows);

        for (let col = 0; col < this.#columns; col++) {
            for (let row = 0; row < this.#rows; row++) {
                const livingNeighbors = this.#getLivingNeighborCount(col, row);

                if (this.isCellAlive({ col, row }) && (livingNeighbors === 2 || livingNeighbors === 3)) {
                    this.#setCellState(newGrid, col, row, Life.CELL_STATE_ALIVE);
                } else if (!this.isCellAlive({ col, row }) && livingNeighbors === 3) {
                    this.#setCellState(newGrid, col, row, Life.CELL_STATE_ALIVE);
                } else {
                    this.#setCellState(newGrid, col, row, Life.CELL_STATE_DEAD);
                }
            }
        }
        this.#grid = newGrid;
    }

    #initGrid(grid) {
        for (let col = 0; col < grid.length; col++) {
            grid[col].fill(Life.CELL_STATE_DEAD);
        }
    }

    #newGrid(columns, rows) {
        const grid = new Array(columns);
        for (let col = 0; col < columns; col++) {
            grid[col] = new Array(rows);
        }
        return grid;
    }

    #setCellState(grid, col, row, state) {
        grid[col][row] = state;
    }

    #getLivingNeighborCount(cellCol, cellRow) {
        const neighbors = [];
        for (let col = cellCol - 1; col <= cellCol + 1; col++) {
            for (let row = cellRow - 1; row <= cellRow + 1; row++) {
                const cell = this.#grid[col]?.[row];
                if (cell === true && !(col === cellCol && row === cellRow)) {
                    neighbors.push(cell);
                }
            }
        }
        return neighbors.length;
    }
}

export { Life };