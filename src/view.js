class View {

    #onRunCommand;
    #onPauseCommand;
    #onNextCommand;
    #onResetCommand;

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
}

export { View };