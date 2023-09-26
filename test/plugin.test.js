import { expect, test } from 'bun:test';
import testModule from './test-module.coffee';

test('works', () => {
  console.log(testModule);
  expect(testModule).toBeTypeOf('object');

  expect(testModule.foo).toBeTypeOf('string');
  expect(testModule.foo).toStrictEqual('bar');

  expect(testModule.bar).toBeTypeOf('function');
  expect(testModule.bar()).toStrictEqual('foo');
});
