import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import buildDifference from './buildDifference.js';
import formatter from './formatters/index.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFileSync = (filename) => fs.readFileSync(getPath(filename));

const parsingFile = (format, file) => (format === 'json' ? JSON.parse(readFileSync(file), 'utf-8') : yaml.load(readFileSync(file), 'utf-8'));

const getData = (file) => {
  const format = path.extname(file);
  return parsingFile(format, file);
};

const genDiff = (file1, file2, type = 'stylish') => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const difference = buildDifference(data1, data2);
  const result = formatter(difference, type);

  console.log(result);
  return result;
};

export default genDiff;
