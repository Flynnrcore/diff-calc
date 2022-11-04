import { test, expect } from '@jest/globals';
//import { fileURLToPath } from 'url';
//import getParse from '../src/parsers.js';
//import fs from 'fs';
//import path from 'path';
import genDiff from '../index.js';

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8'); */

const resultJSON = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}`;
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
  expect(genDiff('__fixtures__/filepath1.json','__fixtures__/filepath2.json')).toEqual(resultJSON);
});

/* test('getCompareJSON', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectResult);
}); */

test('getCompareYML', () => {
  expect(genDiff('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml')).toEqual(expectResult);
});
