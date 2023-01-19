import { Life } from "./life.js";
import { WebView } from "./webView.js";
import { Controller } from "./controller.js";


const life = Life.newLife(130, 75);
const webView = new WebView();
Controller.newController(life, webView);
