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
	let content = handle_individual_variable(src);
	content = handle_object_property(content);
	return content;
}

function remove_ts_comments(content: string) {
	return content.replace(/\\?\$?\{\s*\/\*\s*@ts-[\w-]+\s*\*\/\s*\}\s*/g, "");
}


function handle_individual_variable(src: string) {
	const template_regex = /template(\: string)? \= \<(\w+)\>([\w\W]*)\<\/\w+\>;/gm;
	let match = template_regex.exec(src);
	if (!match) {
		return src;
	}
	let matched_template = match[0];
	let cursor = 0;
	let template_declaration = "template = `";
	while (!template_declaration.endsWith("<")) {
		const char = matched_template.charAt(cursor);
		cursor += 1;
		if (char != "<") {
			continue;
		}
		template_declaration += char;
	}
	console.log(matched_template);
	while (cursor < matched_template.length) {
		const char = matched_template.charAt(cursor);
		if (char == "{") {
			template_declaration += "\\$";
		}
		if (char == ";") {
			template_declaration += "`";
		}
		template_declaration += char;
		cursor += 1;
	}
	let content = src.replace(matched_template, template_declaration);
	content = remove_ts_comments(content);
	return content;
}


function handle_object_property(src: string) {
	const template_regex = /template: *\<(\w+)\>([\w\W]*)\<\/\w+\>(( as unkown)? as string)?\,/gm;
	let match = template_regex.exec(src);
	if (!match) {
		console.log("No template within object");
		console.log(src);
		return src;
	}

	let matched_template = match[0];
	let cursor = 0;
	let template_declaration = "template: `";
	while (!template_declaration.endsWith("<")) {
		const char = matched_template.charAt(cursor);
		cursor += 1;
		if (char != "<") {
			continue;
		}
		template_declaration += char;
	}
	console.log(matched_template);
	while (cursor < matched_template.length) {
		const char = matched_template.charAt(cursor);
		cursor += 1;
		if (char == "{") {
			template_declaration += "\\$";
		}
		if (char == "," && cursor == matched_template.length) {
			template_declaration += "`";
		}
		template_declaration += char;
	}
	let content = src.replace(matched_template, template_declaration);
	content = remove_ts_comments(content);
	return content;
}

// type SomeTokenType = "<NONE>" | "declaring" | "<TYPING>";

// type SomeToken = {
// 	type: SomeTokenType;
// 	phrase: string;
// 	children: SomeToken[];
// };

// function get_next_token(src: string, index: number, parent: SomeToken | null = null): [number, SomeToken] {
// 	let phrase = "";
// 	let type: SomeTokenType = "<NONE>";
// 	let children: SomeToken[] = [];
// 	while (index < src.length) {
// 		const char = src.charAt(index);
// 		index += 1;
// 		if (char == " ") {
// 			if (phrase.length == 0) {
// 				type = "<NONE>";
// 				phrase = char;
// 				break;
// 			}
// 		}
// 	}
// 	const token: SomeToken = {
// 		type,
// 		phrase,
// 		children,
// 	};
// 	return [index, token];
// }


