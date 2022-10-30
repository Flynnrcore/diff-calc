import getCompareObj from './src/compare.js';
import getParse from './src/parsers.js';
import stylish from './src/stylish.js';

const genDiff = (file1, file2) => {
  const firstFile = getParse(file1);
  const secondFile = getParse(file2);
  const compareFiles = getCompareObj(firstFile, secondFile);
  const result = stylish(compareFiles);

  console.log(result);
  return result;
};

export default genDiff;
