import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultStylish = readFile('resultStylish.txt');
const resultPlain = readFile('resultPlain.txt');
const resultJSON = readFile('resultJSON.txt');

test.each([
  {
    file1: '__fixtures__/file1.json', file2: '__fixtures__/file2.json', style: 'stylish', expected: resultStylish,
  },
  {
    file1: '__fixtures__/filepath1.yml', file2: '__fixtures__/filepath2.yml', expected: resultStylish,
  },
  {
    file1: '__fixtures__/file1.json', file2: '__fixtures__/file2.json', style: 'plain', expected: resultPlain,
  },
  {
    file1: '__fixtures__/file1.json', file2: '__fixtures__/file2.json', style: 'json', expected: resultJSON,
  },
  {
    file1: '__fixtures__/filepath1.yml', file2: '__fixtures__/filepath2.yml', style: 'plain', expected: resultPlain,
  },
])('getCompare', ({
  file1, file2, style, expected,
}) => {
  expect(genDiff(file1, file2, style)).toEqual(expected);
});
