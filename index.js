import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFileSync = (filename) => fs.readFileSync(getPath(filename));

const getCompareObj = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  const commonKeys = _.sortBy(_.union(keysObj1, keysObj2));
  const result = commonKeys.reduce((acc, key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      acc.push(obj2[key] === obj1[key] ? `  ${key}: ${obj2[key]}` : `- ${key}: ${obj1[key]}
+ ${key}: ${obj2[key]}`);
    } else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      acc.push(`- ${key}: ${obj1[key]}`);
    } else {
      acc.push(`+ ${key}: ${obj2[key]}`);
    }
    return acc;
  }, []);
  return result;
};

const genDiff = (file1, file2) => {
  const firstFile = JSON.parse(readFileSync(file1), 'utf-8');
  const secondFile = JSON.parse(readFileSync(file2), 'utf-8');
  const compareFiles = getCompareObj(firstFile, secondFile);
  const result = `{
${compareFiles.join('\n')}
}`;

  console.log(result);
  return result;
};

export default genDiff;
