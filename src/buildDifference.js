import _ from 'lodash';

const buildDifference = (obj1, obj2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const result = commonKeys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { type: 'nested', key: `${key}`, children: buildDifference(obj1[key], obj2[key]) };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { type: 'added', key: `${key}`, value: obj2[key] };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { type: 'deleted', key: `${key}`, value: obj1[key] };
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        type: 'changed', key: `${key}`, value1: obj1[key], value2: obj2[key],
      };
    }

    return { type: 'unchanged', key: `${key}`, value: obj1[key] };
  });

  return result;
};

export default buildDifference;
