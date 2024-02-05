import { fetch } from "./fetch";
import { Pool, createPool } from "./pool";

type MDArray = (string | MDArray)[];

const mdArray = [
  'foo',
  ['bar', 'baz', 'baz2', 'baz3', 'baz4', [ 'qux', 'quux', 'quuz' ]],
  'corge',
  ['grault', 'garply', '123', '345', '567', '890'],
  ['waldo', ['fred', 'plugh', 'xyzzy'], 'thud', 'qux'],
];

function delay<T>(x: T): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(x), Math.random() * 400 + 100);
  });
}

function makeGenerator(url: string, pool: Pool, visited = new Set<string>()): Promise<Generator<string>> {
  visited.add(url);
  
  console.log('fetching', url);
  return fetch(url).then(function*(page) {
    yield page.url;
  
    for (const el of page.content) {
      if (el.type === 'link' && !visited.has(el.href)) {
        makeGenerator(el.href, pool, visited).then(function* (gen) {
          yield* gen;
        });
      }
    }
  });

}
  
async function runGenerator<T>(gen: Generator<T>, cb: (x: T) => void): Promise<void> {  
  for await (const val of gen) {
    cb(val);
  }

  return Promise.resolve();
}

async function main() {
  const pool = createPool(1);
  const gen = await makeGenerator('/index', pool);

  await runGenerator(gen, x => console.log(x));

  console.log('*** done ***');
}

main();
