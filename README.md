# bun-coffeescript
A simple & small plugin for [bun](https://bun.sh/) to add support for CoffeeScript.

CoffeeScript hasn't been updated in a while, so I've taken the liberty to simply add it as a direct dependency.

## Installation
There's different considerations for different types of projects. When simply using bun-coffeescript as part of an application, you may add it as direct dependency with bun's built-in package manager:

```bash
$ bun add bun-coffeescript
```

When aiming to write (part of) your library in CoffeeScript, you likely want to build & bundle your library as pure JavaScript. Thus, add bun-coffeescript as a dev dependency using the `-d` option to allow compatibility with Node and/or browsers:

```bash
$ bun add -d bun-coffeescript
```

Finally, make sure to preload the plugin. Either call bun's `plugin` function yourself in a custom preload script, or add my register script to your `bunfig.toml` or your `Bun.build` call:

```toml
preload: ['bun-coffeescript/register']
```

```js
Bun.build({
  // ... more config
  preload: [
    'bun-coffeescript/register',
    // ... more preload scripts
  ],
  // ... yet more config
});
```

## Building with bun-coffeescript
When using CoffeeScript sources in your project you won't be able to simply run `bun build`, because the `bunfig.toml` configuration settings are only respected for the execution of the `bun build` command itself, not for the actual build process. Thus, attempting to run `bun build index.coffee` will simply result in an `index.js` which imports the contents of `index.coffee` as raw string - ie. it is using bun's built-in file loader rather than this plugin's CoffeeScript loader.

To properly build (and by proxy bundle) your project, you must interface with the bun API directly. For example:

```coffee
# build.coffee in project root
import CoffeeScriptPlugin from 'bun-coffeescript'

# Bun is an implicitly defined global in the Bun runtime
Bun.build
  target: 'node'
  entrypoints: ['./index.coffee']
  plugins: [CoffeeScriptPlugin()]
  outdir: 'build'
  define:
    'process.env.ENV': '"PROD"'
```

Specifying the `process.env.ENV` (or, for compatibility, `process.env.NODE_ENV`) is helpful as there are some differences between running your code directly through the bun runtime versus running bundled code. For example, the `__dirname` constant is replaced (as if implicitly `define`d) with the path at build time, not at runtime.

## Testing
Unfortunately, bun does not currently support adding new extensions to the unit testing suite. Thus, you are not able to write your unit tests in CoffeeScript. However, you will need to preload this plugin by adding it to your `bunfig.toml`:

```toml
[test]
preload = ['bun-coffeescript/register']
```
