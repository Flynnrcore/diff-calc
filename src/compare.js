import _ from 'lodash';

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

export default getCompareObj;
