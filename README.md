# JSX to String

Within `plugin/my-plugin.ts` is the script that turns a template variable or object property that's JSX into a string.

This is a rather simple and dumb project done for learning purposes.
I've learned that regex is hard.

## Start up

```console
$ pnpm install
$ pnpm run dev
```

TypeScript might shout about missing types for `@peasy-lib/peasy-ui`, if so:
1. Go to the `node_modules/@peasy-lib/peasy-ui` folder and 
2. Remove the exports property within the package.json.

