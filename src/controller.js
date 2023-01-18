class Controller {
    #life;
    #view;

    constructor(life, view) {
        view.onRunCommand = this.run;
        view.onNextCommand = this.next;
        view.onPauseCommand = this.pause;
        view.onResetCommand = this.reset;
        view.onToggleCellCommand = this.toggleCellState;

        life.onNextState = this.update;

        this.#life = life;
        this.#view = view;
    }

    static newController(life, view) {
        return new Controller(life, view);
    }

    run(frequency) {
        setInterval(() => { this.next(); }, 1000 / frequency);
    }

    next() {
        this.#life.nextState?.();
    }

    pause() { }

    reset() {
        this.#life.clear();
    }

    toggleCellState([col, row]) {
        this.#life.toggleCellState([col, row]);
    }

    update() {
        this.#view.update();
    }
}

export { Controller };