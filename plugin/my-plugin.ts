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

function transpile(src: string) {
	const template_regex = /const template(\: string)? \= \<(\w+)\>([\w\W]*)\<\/\w+\>;/gm;
	let match = template_regex.exec(src);
	if (!match) {
		throw new Error("No template in pui file");
	}
	console.log(match[0]);
	const matched = match[0];
	let cursor = 0;
	let template_declaration = "const template = `";
	while (!template_declaration.endsWith("<")) {
		const char = matched.charAt(cursor);
		cursor += 1;
		if (char != "<") {
			continue;
		}
		template_declaration += char;
	}
	while (cursor < matched.length) {
		const char = matched.charAt(cursor);
		if (char == ";") {
			template_declaration += "`";
		}
		template_declaration += char;
		cursor += 1;
	}
	let content = src.replace(matched, template_declaration);

	match = /^\s*import +React +from +\"react\";?$/im.exec(content);
	if (match) {
		const matched = match[0];
		content = content.replace(matched, "");
	}
	return content;
}

type SomeTokenType = "<NONE>" | "declaring" | "<TYPING>";

type SomeToken = {
	type: SomeTokenType;
	phrase: string;
	children: SomeToken[];
};

function get_next_token(src: string, index: number, parent: SomeToken | null = null): [number, SomeToken] {
	let phrase = "";
	let type: SomeTokenType = "<NONE>";
	let children: SomeToken[] = [];
	while (index < src.length) {
		const char = src.charAt(index);
		index += 1;
		if (char == " ") {
			if (phrase.length == 0) {
				type = "<NONE>";
				phrase = char;
				break;
			}
		}
	}
	const token: SomeToken = {
		type,
		phrase,
		children,
	};
	return [index, token];
}


