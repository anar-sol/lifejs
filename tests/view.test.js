import { View } from "../src/view.js";

describe("WebView", () => {

    let view;

    beforeEach(() => {
        view = View.newView();
    });

    test("onRunCommand", () => {
        const freq = 5;
        const callback = jest.fn();
        view.onRunCommand = callback;

        expect(callback).toBeCalledTimes(0);

        view.runCommand(freq);
        expect(callback).toBeCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(freq);
    });

    test("onPauseCommand", () => {
        const callback = jest.fn();
        view.onPauseCommand = callback;

        expect(callback).toBeCalledTimes(0);

        view.pauseCommand();
        expect(callback).toBeCalledTimes(1);
    });

    test("onNextCommand", () => {
        const steps = 10;
        const callback = jest.fn();
        view.onNextCommand = callback;

        expect(callback).toBeCalledTimes(0);

        view.nextCommand(steps);
        expect(callback).toBeCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(steps);
    });

    test("onResetCommand", () => {
        const callback = jest.fn();
        view.onResetCommand = callback;

        expect(callback).toBeCalledTimes(0);

        view.resetCommand();
        expect(callback).toBeCalledTimes(1);
    });
});
