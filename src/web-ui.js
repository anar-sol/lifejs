class WebUI {

    #canvas;
    #context;
    #color;
    #background;
    #cellSize;
    #life;
    #delay;
    #intervalID;

    constructor({ canvas, color = "black", background = "white", cellSize = 10, delay, life }) {
        this.#canvas = canvas;
        this.#context = canvas.getContext("2d");
        this.#color = color;
        this.#background = background;
        this.#cellSize = cellSize;
        this.#life = life;
        this.#delay = delay;
        this.#intervalID = null;
        this.update();
    }

    run() {
        if (this.#intervalID === null) {
            this.#intervalID = setInterval(() => { this.#life.nextState(); this.update(); }, this.#delay);
        }
    }

    pause() {
        if (this.#intervalID !== null) {
            clearInterval(this.#intervalID);
            this.#intervalID = null;
        }
    }

    toggleCell(x, y) {
        const col = Math.trunc(x / this.#cellSize);
        const row = Math.trunc(y / this.#cellSize);

        this.#life.toggleCellState({ col, row });
        this.update();
    }

    update() {
        this.#erase();
        this.#draw();
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

export { WebUI };