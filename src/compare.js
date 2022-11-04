import _ from 'lodash';

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof (currentValue) !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const arrValue = Object.entries(currentValue);
    const lines = arrValue.map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    const result = ['{', ...lines, `${bracketIndent}}`].join('\n');

    return result;
  };

  return iter(value, 1);
};

const getCompareObj = (obj1, obj2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = commonKeys.reduce((acc, key) => {
    if (typeof (obj1[key]) === 'object' && typeof (obj2[key]) === 'object') {
      acc.push({ type: 'nested', key: `${key}`, children: getCompareObj(obj1[key], obj2[key]) });
    } else if (!Object.hasOwn(obj1, key)) {
      acc.push({ type: 'added', key: `${key}`, value: `${stringify(obj2[key])}` });
    } else if (!Object.hasOwn(obj2, key)) {
      acc.push({ type: 'deleted', key: `${key}`, value: `${stringify(obj1[key])}` });
    } else if (obj1[key] !== obj2[key]) {
      acc.push({
        type: 'changed', key: `${key}`, value1: `${stringify(obj1[key])}`, value2: `${stringify(obj2[key])}`,
      });
    } else if (obj1[key] === obj2[key]) {
      acc.push({ type: 'unchanged', key: `${key}`, value: `${stringify(obj1[key])}` });
    }

    return acc;
  }, []);
  return result;
};

export default getCompareObj;
