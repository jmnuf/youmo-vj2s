import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { Counter } from './counter.pui';

export function example() {
	const title = "Vite + TypeScript + Peasy";
	let counter = Counter();
	typescriptLogo; viteLogo;
	
	return {
		template: <div>
			<a href="https://vitejs.dev" target="_blank">
				<img src="${viteLogo}" className="logo" alt="Vite logo" />
			</a>
			<a href="https://www.typescriptlang.org/" target="_blank">
				<img src="${typescriptLogo}" className="logo vanilla" alt="TypeScript logo" />
			</a>
			<h1>{ title }</h1>
			<div className="card" pui="counter ===">
			</div>
			<p className="read-the-docs">
				Click on the Vite and TypeScript logos to learn more
			</p>
		</div> as unknown as string,
		title,
		counter,
	};
}
