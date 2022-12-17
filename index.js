import buildDifference from './src/compare.js';
import getData from './src/parsers.js';
import format from './src/formatters/index.js';

const genDiff = (file1, file2, type = 'stylish') => {
  const firstFileContent = getData(file1);
  const secondFileContent = getData(file2);
  const compareContent = buildDifference(firstFileContent, secondFileContent);
  const result = format(compareContent, type);

  console.log(result);
  return result;
};

export default genDiff;
