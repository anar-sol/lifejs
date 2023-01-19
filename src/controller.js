class Controller {
    #life;
    #view;
    #intervalID;

    constructor(life, view) {
        view.onRunCommand = (frequency) => { this.run(frequency); };
        view.onNextCommand = (steps) => { this.next(steps); };
        view.onPauseCommand = () => { this.pause(); };
        view.onResetCommand = () => { this.reset(); };
        view.onToggleCellCommand = (cell) => { this.toggleCellState(cell); };

        life.onNextState = () => { this.update(); };

        this.#life = life;
        this.#view = view;
        this.#intervalID = null;
    }

    static newController(life, view) {
        return new Controller(life, view);
    }

    run(frequency) {
        if (this.#intervalID == null) {
            this.#intervalID = setInterval(() => { this.next(); }, 1000 / frequency);
        }
    }

    next() {
        this.#life.nextState?.();
    }

    pause() {
        clearInterval(this.#intervalID);
        this.#intervalID = null;
    }

    reset() {
        this.pause();
        this.#life.clear();
    }

    toggleCellState([col, row]) {
        this.#life.toggleCellState([col, row]);
    }

    update() {
        this.#view.update(this.#life);
    }
}

export { Controller };