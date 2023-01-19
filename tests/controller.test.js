import { Controller } from "../src/controller.js";


describe("Controller", () => {

    let controller;

    beforeEach(() => {
        controller = Controller.newController({}, {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    test("has a run function", () => {
        expect(controller.run).toBeInstanceOf(Function);
    });

    test("newController registers onRunCommand callback", () => {
        const onRunCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onRunCommand', {
            set: onRunCommand,
        });

        Controller.newController({}, view);
        expect(onRunCommand).toHaveBeenLastCalledWith(expect.any(Function));
    });

    test("newController onRunCommand callback calls controller.run", () => {
        const frequency = 10;
        const view = {
            set onRunCommand(callback) {
                this.callback = callback;
            },

            runCommand(freq) {
                this.callback(freq);
            }
        };
        const controller = Controller.newController({}, view);
        const spy = jest.spyOn(controller, "run");

        view.runCommand(frequency);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(frequency);

        controller.pause();
    });

    test("run calls setInterval", () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setInterval');

        controller.run(10);
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000 / 10);

        controller.pause();
    });

    test("run do not call setInterval if already running", () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setInterval');

        controller.run(10);
        expect(setInterval).toHaveBeenCalledTimes(1);
        controller.run(10);
        expect(setInterval).toHaveBeenCalledTimes(1);

        controller.pause();
    });

    test("run registers a callback that calls controller.next", () => {
        jest.useFakeTimers();
        const spy = jest.spyOn(controller, "next");

        controller.run(10);
        expect(spy).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(1000 / 10);
        expect(spy).toHaveBeenCalledTimes(1);

        controller.pause();
    });

    test("has a next function", () => {
        expect(controller.next).toBeInstanceOf(Function);
    });

    test("newController registers onNextCommand callback", () => {
        const onNextCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onNextCommand', {
            set: onNextCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onNextCommand).toHaveBeenLastCalledWith(expect.any(Function));
    });

    test("next calls life.nextState", () => {
        const nextState = jest.fn();
        const life = {
            nextState: nextState,
        };

        const controller = Controller.newController(life, {});
        controller.next();
        expect(nextState).toHaveBeenCalledTimes(1);
    });

    test("Controller onNextCommand callback calls controller.next", () => {
        const steps = 3;
        const view = {
            set onNextCommand(callback) {
                this.callback = callback;
            },

            nextCommand(steps) {
                this.callback(steps);
            }
        };
        const controller = Controller.newController({}, view);
        const spy = jest.spyOn(controller, "next");

        view.nextCommand(steps);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(steps);
    });

    test("has a pause function", () => {
        expect(controller.pause).toBeInstanceOf(Function);
    });

    test("newController registers onPauseCommand callback", () => {
        const onPauseCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onPauseCommand', {
            set: onPauseCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onPauseCommand).toHaveBeenLastCalledWith(expect.any(Function));
    });

    test("pause calls clearInterval", () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'clearInterval');
        const fakeSetInterval = jest.fn();
        const intervalID = 123;
        fakeSetInterval.mockReturnValue(intervalID);
        const tmp = globalThis.setInterval;
        globalThis.setInterval = fakeSetInterval;

        controller.run(10);
        controller.pause();
        expect(clearInterval).toHaveBeenCalledTimes(1);
        expect(clearInterval).toHaveBeenCalledWith(intervalID);

        globalThis.setInterval = tmp;
    });

    test("Controller onPauseCommand callback calls controller.next", () => {
        const view = {
            set onPauseCommand(callback) {
                this.callback = callback;
            },

            pauseCommand() {
                this.callback();
            }
        };
        const controller = Controller.newController({}, view);
        const spy = jest.spyOn(controller, "pause");

        view.pauseCommand();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("has a reset function", () => {
        expect(controller.reset).toBeInstanceOf(Function);
    });

    test("newController registers onResetCommand callback", () => {
        const onResetCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onResetCommand', {
            set: onResetCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onResetCommand).toHaveBeenLastCalledWith(expect.any(Function));
    });

    test("reset calls life.clear", () => {
        const clear = jest.fn();
        const life = {
            clear: clear,
        };

        const controller = Controller.newController(life, {});
        controller.reset();
        expect(clear).toHaveBeenCalledTimes(1);
    });

    test("reset calls controller.pause", () => {
        const life = {
            clear() {},
        };
        const controller = Controller.newController(life, {});
        const spy = jest.spyOn(controller, "pause");

        controller.reset();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("Controller onResetCommand callback calls controller.reset", () => {
        const life = {
            clear() {},
        };
        const view = {
            set onResetCommand(callback) {
                this.callback = callback;
            },

            resetCommand() {
                this.callback();
            }
        };
        const controller = Controller.newController(life, view);
        const spy = jest.spyOn(controller, "reset");

        view.resetCommand();
        expect(spy).toHaveBeenCalledTimes(1);
    });


    test("has a toggleCellState function", () => {
        expect(controller.toggleCellState).toBeInstanceOf(Function);
    });

    test("newController registers onToggleCellCommand callback", () => {
        const onToggleCellCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onToggleCellCommand', {
            set: onToggleCellCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onToggleCellCommand).toHaveBeenLastCalledWith(expect.any(Function));
    });

    test("toggleCellState calls life.toggleCellState", () => {
        const toggleCellState = jest.fn();
        const life = {
            toggleCellState: toggleCellState,
        };
        const cell = [2, 5];

        const controller = Controller.newController(life, {});
        controller.toggleCellState(cell);
        expect(toggleCellState).toHaveBeenCalledTimes(1);
        expect(toggleCellState).toHaveBeenLastCalledWith(cell);
    });

    test("Controller onToggleCellCommand callback calls controller.toggleCellState", () => {
        const cell = [10, 15];
        const life = {
            toggleCellState() {},
        };
        const view = {
            set onToggleCellCommand(callback) {
                this.callback = callback;
            },

            toggleCellCommand(cell) {
                this.callback(cell);
            }
        };
        const controller = Controller.newController(life, view);
        const spy = jest.spyOn(controller, "toggleCellState");

        view.toggleCellCommand(cell);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(cell);
    });

    test("has an update function", () => {
        expect(controller.update).toBeInstanceOf(Function);
    });

    test("newController registers onNextState callback", () => {
        const onNextState = jest.fn();
        const life = {};
        Object.defineProperty(life, 'onNextState', {
            set: onNextState,
        });

        const controller = Controller.newController(life, {});
        expect(onNextState).toHaveBeenLastCalledWith(expect.any(Function));
    });

    test("update calls view.update", () => {
        const update = jest.fn();
        const life = {};
        const view = {
            update: update,
        };

        const controller = Controller.newController(life, view);
        controller.update();
        expect(update).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledWith(life);
    });

    test("Controller onNextState callback calls controller.update", () => {
        const life = {
            set onNextState(callback) {
                this.callback = callback;
            },

            nextState(cell) {
                this.callback(cell);
            }
        };
        const view = {
            update() {}
        };

        const controller = Controller.newController(life, view);
        const spy = jest.spyOn(controller, "update");

        life.nextState();
        expect(spy).toHaveBeenCalledTimes(1);
    });

});