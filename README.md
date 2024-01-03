## ts-project

Basic scaffolding for a new TypeScript project.

Includes:

* basic directory structure
* typescript (& config)
* eslint (& config)
* test scaffolding
* `ramda` (for convenience methods)

### commands

```sh
$ npm run build 
# alias for: npx tsc

$ npm run watch 
# alias for: npx tsc --watch

$ npm run exec 
# alias for: node dist/index.js

$ npm run lint 
# alias of: npx eslint src/ test/

$ npm run test
# alias of: npx jest
# note: run `npx jest --watch` to rerun on changes
```
