# JSX to String

Within `plugin/my-plugin.ts` is the script that turns a template variable or object property that's JSX into a string.

This is a rather simple and dumb project done for learning purposes.
I've learned that regex is hard.

## Run locally:
```console
$ pnpm install
$ pnpm run dev
```

## Fixing Type Issues
TypeScript will definitely shout about the pui attribute not existing.
This has no nice fix, but messing into the node_modules
1. Import type `DetailedHTMLProps` from react
2. Right click on `DetailedHTMLProps` and click "Go to type definition"
3. Change type to 
`type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E & { pui?: string; };`

TypeScript might shout about missing types for `@peasy-lib/peasy-ui`, if so:
1. Go to the `node_modules/@peasy-lib/peasy-ui` folder and 
2. Remove the exports property within the package.json.
