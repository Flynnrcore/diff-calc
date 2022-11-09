import _ from 'lodash';

const getCompareObj = (obj1, obj2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = commonKeys.reduce((acc, key) => {
    if (typeof (obj1[key]) === 'object' && typeof (obj2[key]) === 'object') {
      acc.push({ type: 'nested', key: `${key}`, children: getCompareObj(obj1[key], obj2[key]) });
    } else if (!Object.hasOwn(obj1, key)) {
      acc.push({ type: 'added', key: `${key}`, value: obj2[key] });
    } else if (!Object.hasOwn(obj2, key)) {
      acc.push({ type: 'deleted', key: `${key}`, value: obj1[key] });
    } else if (obj1[key] !== obj2[key]) {
      acc.push({
        type: 'changed', key: `${key}`, value1: obj1[key], value2: obj2[key],
      });
    } else if (obj1[key] === obj2[key]) {
      acc.push({ type: 'unchanged', key: `${key}`, value: obj1[key] });
    }

    return acc;
  }, []);
  return result;
};

export default getCompareObj;
