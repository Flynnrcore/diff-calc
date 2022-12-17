const stringify = (content) => {
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
    const fileredContent = currentValue.filter((obj) => obj.type !== 'unchanged');
    const lines = fileredContent.map((obj) => {
      switch (obj.type) {
        case 'changed':
          return `Property '${depth}${obj.key}' was updated. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
        case 'deleted':
          return `Property '${depth}${obj.key}' was removed`;
        case 'added':
          return `Property '${depth}${obj.key}' was added with value: ${stringify(obj.value)}`;
        case 'nested':
          return iter(obj.children, `${depth}${obj.key}.`);
        default:
          throw new Error('Error in the type of data changes');
      }
    });

    return lines.join('\n');
  };

  return iter(arr);
};

export default plain;
