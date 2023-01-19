import { View } from "./view.js";

class WebView extends View {
    #config = {
        color: "black",
        background: "white",
        cellSize: 10
    };
    #canvas;
    #context;

    constructor() {
        super();
        this.init();
    }

    init() {
        const canvasContainer = document.querySelector(".canvas-container");
        const canvas = document.querySelector(".canvas");
        const btnStart = document.querySelector(".control-start");
        const btnNext = document.querySelector(".control-next");
        const btnPause = document.querySelector(".control-pause");
        const btnReset = document.querySelector(".control-reset");

        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;

        this.#canvas = canvas;
        this.#context = canvas.getContext("2d");

        btnStart.addEventListener("click", () => {
            this.runCommand(5);
        });

        btnNext.addEventListener("click", () => {
            this.nextCommand();
        });

        btnPause.addEventListener("click", () => {
            this.pauseCommand();
        });

        btnReset.addEventListener("click", () => {
            this.resetCommand();
        });

        canvas.addEventListener("click", event => {
            this.toggleCellCommand(this.#getCellCoord(event.offsetX, event.offsetY));
        });

        this.#erase();
    }

    update(life) {
        this.#erase();
        this.#draw(life);
    }

    #getCellCoord(x, y) {
        const col = Math.trunc(x / this.#config.cellSize);
        const row = Math.trunc(y / this.#config.cellSize);
        return [col, row];
    }

    #draw(life) {
        this.#context.fillStyle = this.#config.color;

        for (let col = 0; col < life.columns; col++) {
            for (let row = 0; row < life.rows; row++) {
                const x = col * this.#config.cellSize;
                const y = row * this.#config.cellSize;
                if (life.isCellAlive([col, row])) {
                    this.#drawCell(x, y);
                }
            }
        }
    }

    #erase() {
        this.#context.fillStyle = this.#config.background;
        this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    #drawCell(x, y) {
        this.#context.fillRect(x, y, this.#config.cellSize, this.#config.cellSize);
    }
}

export { WebView };