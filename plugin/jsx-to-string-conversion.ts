
function remove_ts_comments(content: string) {
	return content.replace(/\\?\$?\{\s*\/\*\s*@ts-[\w-]+\s*\*\/\s*\}\s*/g, "");
}

export function handle_individual_variable(src: string) {
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
	// console.log(matched_template);
	while (cursor < matched_template.length) {
		const char = matched_template.charAt(cursor);
		if (char == "{" && matched_template.charAt(cursor - 1) != "$") {
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

export function handle_object_property(src: string) {
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
	// console.log(matched_template);
	while (cursor < matched_template.length) {
		const char = matched_template.charAt(cursor);
		if (char == "{" && matched_template.charAt(cursor - 1) != "$") {
			template_declaration += "\\$";
		}
		if (char == "," && (cursor + 1) >= matched_template.length) {
			template_declaration += "`";
		}
		cursor += 1;
		template_declaration += char;
	}
	let content = src.replace(matched_template, template_declaration);
	content = remove_ts_comments(content);
	content = switch_classname_to_class(content);
	return content;
}


function switch_classname_to_class(template: string) {
	const regex = / className\=\"/g;
	return template.replace(regex, " class=\"");
};

export default function transpile(src: string) {
	let content = handle_individual_variable(src);
	content = handle_object_property(content);
	return content;
}