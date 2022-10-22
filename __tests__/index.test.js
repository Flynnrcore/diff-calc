import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const expectResult = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

test('getCompareJSON', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectResult);
});

test('getCompareYML', () => {
  expect(genDiff('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml')).toEqual(expectResult);
});
