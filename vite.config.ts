import Inspect from 'vite-plugin-inspect';
import my_plugin from "./plugin/my-plugin";

export default {
	plugins: [
		my_plugin(),
		Inspect({
			build: true,
			outputDir: '.vite-inspect'
		}),
	],
};
