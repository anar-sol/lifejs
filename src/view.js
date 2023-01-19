class View {

    #onRunCommand;
    #onPauseCommand;
    #onNextCommand;
    #onResetCommand;
    #onToggleCellCommand;

    constructor() {
        this.#onRunCommand = null;
        this.#onPauseCommand = null;
        this.#onNextCommand = null;
        this.#onResetCommand = null;
        this.onToggleCellCommand = null;
    }

    static newView() {
        return new View();
    }

    set onRunCommand(callback) {
        this.#onRunCommand = callback;
    }

    set onPauseCommand(callback) {
        this.#onPauseCommand = callback;
    }

    set onNextCommand(callback) {
        this.#onNextCommand = callback;
    }

    set onResetCommand(callback) {
        this.#onResetCommand = callback;
    }

    set onToggleCellCommand(callback) {
        this.#onToggleCellCommand = callback;
    }

    runCommand(frequency) {
        if (this.#onRunCommand) {
            this.#onRunCommand(frequency);
        }
    }

    pauseCommand() {
        if (this.#onPauseCommand) {
            this.#onPauseCommand();
        }
    }

    nextCommand(steps) {
        if (this.#onNextCommand) {
            this.#onNextCommand(steps);
        }
    }

    resetCommand() {
        if (this.#onResetCommand) {
            this.#onResetCommand();
        }
    }

    toggleCellCommand([col, row]) {
        if (this.#onToggleCellCommand) {
            this.#onToggleCellCommand([col, row]);
        }
    }

    update() {
        throw new Error("not implemented");
    }
}

export { View };