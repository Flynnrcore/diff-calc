import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileFormats = ['json', 'yml', 'yaml'];

describe('checking genDiff operation', () => {
  test.each(fileFormats)('genDiff %p file format check', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(readFile('resultStylish.txt'));
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFile('resultStylish.txt'));
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFile('resultPlain.txt'));
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFile('resultJSON.txt'));
  });
});
