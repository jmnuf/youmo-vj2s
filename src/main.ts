import './style.css';
import { UI } from "@peasy-lib/peasy-ui";
import { example } from "./my-file.pui";

const pui_app = example();

console.log(pui_app);
console.log(pui_app.template);

UI.create("#pui-app", pui_app, pui_app.template);
