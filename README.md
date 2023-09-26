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

## Testing
Unfortunately, bun does not currently support adding new extensions to the unit testing suite. Thus, you are not able to write your unit tests in CoffeeScript. However, you will need to preload this plugin by adding it to your `bunfig.toml`:

```toml
[test]
preload = ['bun-coffeescript/register']
```
