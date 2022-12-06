import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';
import stylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultStylish = readFile('resultStylish.txt');
const resultPlain = readFile('resultPlain.txt');

const expectResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('getCompareStylisFormat', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', stylish)).toEqual(resultStylish);
  expect(genDiff('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml')).toEqual(expectResult);
});

test('getComparePlainFormat', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(resultPlain);
});
