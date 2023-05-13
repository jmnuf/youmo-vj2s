import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { Counter } from './counter.pui';

export function example() {
	const title = "Vite + TypeScript + Peasy";
	let counter = Counter();
	
	return {
		typescriptLogo,
		viteLogo,
		template: <div>
			<a href="https://vitejs.dev" target="_blank">
				{/* @ts-expect-error */}
				<img pui="src <=| viteLogo" class="logo" alt="Vite logo" />
			</a>
			<a href="https://www.typescriptlang.org/" target="_blank">
				{/* @ts-expect-error */}
				<img pui="src <=| typescriptLogo" class="logo vanilla" alt="TypeScript logo" />
			</a>
			<h1>{ title }</h1>
			{/* @ts-expect-error */}
			<div class="card" pui="counter ===">
			</div>
			{/* @ts-expect-error */}
			<p class="read-the-docs">
				Click on the Vite and TypeScript logos to learn more
			</p>
		</div> as unknown as string,
		title,
		counter,
	};
}
