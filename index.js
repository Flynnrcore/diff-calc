import getCompareObj from './src/compare.js';
import getParse from './src/parsers.js';
// import stylish from './src/formatters/stylish.js';
import getDisplay from './src/formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const firstFile = getParse(file1);
  const secondFile = getParse(file2);
  const compareFiles = getCompareObj(firstFile, secondFile);
  const result = getDisplay(compareFiles, format);

  console.log(result);
  return result;
};

export default genDiff;
