import { Life } from "./life.js";

class Grid {

    #canvas;
    #context;
    #life;
    #cellSize;
    #color;
    #background;

    constructor({ canvas, color = "black", background = "white", cellSize = 10, startAt, life }) {
        this.#canvas = canvas;
        this.#context = canvas.getContext("2d");
        this.#life = life;
        this.#cellSize = cellSize;
        this.#color = color;
        this.#background = background;
    }

    update() {
        this.#erase();
        this.#draw();
    }

    toggleCell(x, y) {
        const col = Math.trunc(x / this.#cellSize);
        const row = Math.trunc(y / this.#cellSize);

        if (this.#life.isCellAlive({ col, row })) {
            this.#life.setCellState({ col, row }, Life.CELL_STATE_DEAD);
        } else {
            this.#life.setCellState({ col, row }, Life.CELL_STATE_ALIVE);
        }

        this.update();
    }

    #draw() {
        this.#context.fillStyle = this.#color;

        for (let col = 0; col < this.#life.columns; col++) {
            for (let row = 0; row < this.#life.rows; row++) {
                const x = col * this.#cellSize;
                const y = row * this.#cellSize;
                if (this.#life.isCellAlive({ col, row })) {
                    this.#drawCell(x, y);
                }
            }
        }
    }

    #erase() {
        this.#context.fillStyle = this.#background;
        this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    #drawCell(x, y) {
        this.#context.fillRect(x, y, this.#cellSize, this.#cellSize);
    }
}

export { Grid };