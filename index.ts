import { type BunPlugin } from 'bun';
import coffee from 'coffeescript';
import fs from 'fs/promises';

// no options yet
export interface CoffeeScriptOptions {}

export default function bunCoffeeScriptPlugin(options: CoffeeScriptOptions = {}): BunPlugin {
  return {
    name: 'bun-coffeescript',
    setup(build) {
      build.onLoad({ filter: /\.coffee$/ }, async (args) => {
        const raw = await fs.readFile(args.path, 'utf8');
        const contents = coffee.compile(raw, {
          bare: true,
          filename: args.path,
          header: false,
          inlineMap: true,
        });

        return {
          contents,
          loader: 'js',
        };
      });
    },
  }
}
