import _ from 'lodash';

const getCompareObj = (obj1, obj2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const getCompare = (data1, data2, key) => {
    if (typeof (data1[key]) === 'object' && typeof (data2[key]) === 'object') {
      return { type: 'nested', key: `${key}`, children: getCompareObj(data1[key], data2[key]) };  
    }

    if (!Object.hasOwn(data1, key)) {
      return { type: 'added', key: `${key}`, value: data2[key] };
    }

    if (!Object.hasOwn(data2, key)) {
      return { type: 'deleted', key: `${key}`, value: data1[key] }
    }

    if (data1[key] !== data2[key]) {
      return {
        type: 'changed', key: `${key}`, value1: data1[key], value2: data2[key],
      };
    }

    return { type: 'unchanged', key: `${key}`, value: data1[key] };
  };

  return commonKeys.map((key) => getCompare(obj1, obj2, key));
};

export default getCompareObj;
