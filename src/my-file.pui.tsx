import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';

export function example() {
	const title = "Vite + TypeScript + Peasy";
	let counter = 0;
	
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
			<div class="card">
				{/* @ts-ignore */}
				<button pui="click @=> on_click" type="button">{ counter }</button>
			</div>
			{/* @ts-expect-error */}
			<p class="read-the-docs">
				Click on the Vite and TypeScript logos to learn more
			</p>
		</div> as unknown as string,
		title,
		get counter() {
			return "Count is " + counter;
		},
		on_click: () => {
			counter += 1;
		}
	};
}
