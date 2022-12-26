import { Life } from "./life.js";
import { Grid } from "./grid.js";

const canvasContainer = document.querySelector(".canvas-container");
const canvas = document.querySelector(".canvas");

const btnStart = document.querySelector(".control-start");
const btnPause = document.querySelector(".control-pause");
const btnReset = document.querySelector(".control-reset");

canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;

let life = new Life(100, 75);
let grid = new Grid({ canvas, life, cellSize: 8 });

let intervalID = null;
btnStart.addEventListener("click", () => {
    if (intervalID === null) {
        intervalID = setInterval(() => { life.nextState(); }, 300);
    }
});

btnPause.addEventListener("click", () => {
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }
});

btnReset.addEventListener("click", () => {
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }
    
    life = new Life(100, 75);
    grid = new Grid({ canvas, life, cellSize: 8 });
});

canvas.addEventListener("click", event => {
    grid.toggleCell(event.offsetX, event.offsetY);
});

setInterval(() => { grid.update(); }, 300);