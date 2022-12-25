import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1JSON = getFixturePath('file1.json');
const file2JSON = getFixturePath('file2.json');
const file1YML = getFixturePath('file1.yml');
const file2YAML = getFixturePath('file2.yaml');
const resultStylish = readFile('resultStylish.txt');
const resultPlain = readFile('resultPlain.txt');
const resultJSON = readFile('resultJSON.txt');

test.each([
  {
    file1: file1JSON, file2: file2JSON, style: 'default', expected: resultStylish,
  },
  {
    file1: file1YML, file2: file2YAML, style: 'stylish', expected: resultStylish,
  },
  {
    file1: file1JSON, file2: file2JSON, style: 'plain', expected: resultPlain,
  },
  {
    file1: file1JSON, file2: file2JSON, style: 'json', expected: resultJSON,
  },
  {
    file1: file1YML, file2: file2YAML, style: 'plain', expected: resultPlain,
  },
  {
    file1: file1YML, file2: file2YAML, style: 'json', expected: resultJSON,
  },
])('test $style formatter', ({
  file1, file2, style, expected,
}) => {
  expect(genDiff(file1, file2, style)).toEqual(expected);
});
