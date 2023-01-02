import path from 'path';
import parse from './parse.js';
import buildDifference from './buildDifference.js';
import formatter from './formatters/index.js';

const getFormat = (filename) => path.extname(filename).slice(1);

const getData = (file) => {
  const formatFile = getFormat(file);
  return parse(file, formatFile);
};

const genDiff = (filepath1, filepath2, type = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const difference = buildDifference(data1, data2);
  const result = formatter(difference, type);

  return result;
};

export default genDiff;
