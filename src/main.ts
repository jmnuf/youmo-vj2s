import './style.css';
// import typescriptLogo from './typescript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.ts';
import { UI } from "@peasy-lib/peasy-ui";
import { example } from "./my-file.pui";

const pui_app = example();

console.log(pui_app);
console.log(pui_app.template);

UI.create("#pui-app", pui_app, pui_app.template);


// document.querySelector<HTMLDivElement>('#vite-app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `;
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
