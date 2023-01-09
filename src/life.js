class Life {

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

    setCellState({ col, row }, state) {
        [col, row] = this.#getEquivalentCoord(col, row);

        this.#setCellState(this.#grid, col, row, state);
    }

    toggleCellState(cell) {
        if (this.isCellAlive(cell)) this.setCellState(cell, Life.CELL_STATE_DEAD);
        else this.setCellState(cell, Life.CELL_STATE_ALIVE);
    }

    isCellAlive({ col, row }) {
        [col, row] = this.#getEquivalentCoord(col, row);

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
                const cellState = this.isCellAlive({ col, row });
                if (cellState === true && !(col === cellCol && row === cellRow)) {
                    neighbors.push(cellState);
                }
            }
        }
        return neighbors.length;
    }
}

export { Life };