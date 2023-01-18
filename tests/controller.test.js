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

    test("newController registers run as onRunCommand", () => {
        const onRunCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onRunCommand', {
            set: onRunCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onRunCommand).toHaveBeenLastCalledWith(controller.run);
    });

    test("run calls setInterval", () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'clearInterval');
        const fakeSetInterval = jest.fn();
        const intervalID = 123;
        fakeSetInterval.mockReturnValue(intervalID);
        const tmp = globalThis.setInterval;
        globalThis.setInterval = fakeSetInterval;

        controller.run(10);
        expect(fakeSetInterval).toHaveBeenCalledTimes(1);
        expect(fakeSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000 / 10);

        controller.pause();
        expect(clearInterval).toHaveBeenCalledTimes(1);
        expect(clearInterval).toHaveBeenCalledWith(intervalID);

        globalThis.setInterval = tmp;
    });

    test("run calls setInterval", () => {
        jest.useFakeTimers();
        const spy = jest.spyOn(controller, "next");

        controller.run(10);
        expect(spy).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(1000 / 10);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("has a next function", () => {
        expect(controller.next).toBeInstanceOf(Function);
    });

    test("newController registers next as onNextCommand", () => {
        const onNextCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onNextCommand', {
            set: onNextCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onNextCommand).toHaveBeenLastCalledWith(controller.next);
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

    test("has a pause function", () => {
        expect(controller.pause).toBeInstanceOf(Function);
    });

    test("newController registers pause as onPauseCommand", () => {
        const onPauseCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onPauseCommand', {
            set: onPauseCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onPauseCommand).toHaveBeenLastCalledWith(controller.pause);
    });

    test("has a reset function", () => {
        expect(controller.reset).toBeInstanceOf(Function);
    });

    test("newController registers reset as onResetCommand", () => {
        const onResetCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onResetCommand', {
            set: onResetCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onResetCommand).toHaveBeenLastCalledWith(controller.reset);
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

    test("has a toggleCellState function", () => {
        expect(controller.toggleCellState).toBeInstanceOf(Function);
    });

    test("newController registers toggleCellState as onToggleCellCommand", () => {
        const onToggleCellCommand = jest.fn();
        const view = {};
        Object.defineProperty(view, 'onToggleCellCommand', {
            set: onToggleCellCommand,
        });

        const controller = Controller.newController({}, view);
        expect(onToggleCellCommand).toHaveBeenLastCalledWith(controller.toggleCellState);
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

    test("has an update function", () => {
        expect(controller.update).toBeInstanceOf(Function);
    });

    test("newController registers update as onNextState", () => {
        const onNextState = jest.fn();
        const life = {};
        Object.defineProperty(life, 'onNextState', {
            set: onNextState,
        });

        const controller = Controller.newController(life, {});
        expect(onNextState).toHaveBeenLastCalledWith(controller.update);
    });

    test("update calls view.update", () => {
        const update = jest.fn();
        const view = {
            update: update,
        };

        const controller = Controller.newController({}, view);
        controller.update();
        expect(update).toHaveBeenCalledTimes(1);
    });
});