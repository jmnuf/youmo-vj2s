import transpile from "./jsx-to-string-conversion";

const fileRegex = /\.(pui)\.(tsx)$/;

export default function my_plugin() {
	return {
		name: 'jsx-template-to-string',

		// Runs after typescript transpiles to javascript
		async transform(src: string, id: string) {
			if (fileRegex.test(id)) {
				console.log("file id:", id);
				return {
					code: transpile(src),
					map: null, // provide source map if available
				};
			}
		},
	};
}


