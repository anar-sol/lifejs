class Life {

    #columns;
    #rows;

    constructor(columns, rows) {
        this.#columns = columns;
        this.#rows = rows;
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
}

export { Life };