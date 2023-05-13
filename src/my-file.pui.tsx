import React from "react";

export function Example() {
	return {
		template
	};
}

// @ts-expect-error
const template: string = <div>
	{/* @ts-expect-error */}
	<h1>{ title }</h1>
</div>;
