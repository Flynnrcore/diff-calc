import getData from './getData.js';
import buildDifference from './buildDifference.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, type = 'stylish') => {
  const dataFile1 = getData(filepath1);
  const dataFile2 = getData(filepath2);
  const difference = buildDifference(dataFile1, dataFile2);
  const result = formatter(difference, type);

  return result;
};

export default genDiff;
