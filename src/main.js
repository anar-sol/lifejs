import { Life } from "./life.js";
import { WebUI } from "./web-ui.js";

const canvasContainer = document.querySelector(".canvas-container");
const canvas = document.querySelector(".canvas");

const btnStart = document.querySelector(".control-start");
const btnPause = document.querySelector(".control-pause");
const btnReset = document.querySelector(".control-reset");

canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;

let life = new Life(100, 75);
let web = new WebUI({ canvas, life, cellSize: 8, delay: 300 });

btnStart.addEventListener("click", () => {
    web.run();
});

canvas.addEventListener("click", event => {
    web.toggleCell(event.offsetX, event.offsetY);
});