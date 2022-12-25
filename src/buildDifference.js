import _ from 'lodash';

const buildDifference = (data1, data2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = commonKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'nested', key: `${key}`, children: buildDifference(data1[key], data2[key]) };
    }

    if (!Object.hasOwn(data1, key)) {
      return { type: 'added', key: `${key}`, value: data2[key] };
    }

    if (!Object.hasOwn(data2, key)) {
      return { type: 'deleted', key: `${key}`, value: data1[key] };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: 'changed', key: `${key}`, value1: data1[key], value2: data2[key],
      };
    }

    return { type: 'unchanged', key: `${key}`, value: data1[key] };
  });

  return result;
};

export default buildDifference;
