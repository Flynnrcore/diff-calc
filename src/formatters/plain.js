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
  const iter = (currentValues, depth = '') => {
    const fileredContent = currentValues.filter((node) => node.type !== 'unchanged');
    const lines = fileredContent.map((node) => {
      switch (node.type) {
        case 'changed':
          return `Property '${depth}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'deleted':
          return `Property '${depth}${node.key}' was removed`;
        case 'added':
          return `Property '${depth}${node.key}' was added with value: ${stringify(node.value)}`;
        case 'nested':
          return iter(node.children, `${depth}${node.key}.`);
        default:
          throw new Error('Error in the type of data changes');
      }
    });

    return lines.join('\n');
  };

  return iter(arr);
};

export default plain;
