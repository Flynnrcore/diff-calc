const display = (content) => {
  if (content === null) {
    return null;
  }

  switch (typeof (content)) {
    case 'string':
      return `'${content}'`;
    case 'object':
      return '[complex value]';
    default:
      return content;
  }
};

const plain = (arr) => {
  const iter = (currentValue, depth = '') => {
    const lines = currentValue
      .filter((obj) => obj.type !== 'unchanged')
      .map((obj) => {
        if (obj.type === 'nested') {
          return iter(obj.children, `${depth}${obj.key}.`);
        }

        switch (obj.type) {
          case 'changed':
            return `Property '${depth}${obj.key}' was updated. From ${display(obj.value1)} to ${display(obj.value2)}`;
          case 'deleted':
            return `Property '${depth}${obj.key}' was removed`;
          case 'added':
            return `Property '${depth}${obj.key}' was added with value: ${display(obj.value)}`;
          default:
            throw new Error('Error in the type of data changes');
        }
      });

    return lines.join('\n');
  };

  return iter(arr);
};

export default plain;
