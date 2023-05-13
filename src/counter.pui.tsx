export function Counter() {
	let counter = 0;
	return {
		template: <div>
			{/* @ts-expect-error */}
			<button pui="click @=> on_click">{counter}</button>
		</div> as unknown as string,
		get counter() {
			return "Count is " + counter;
		},
		on_click: () => {
			counter += 1;
		}
	};
}
