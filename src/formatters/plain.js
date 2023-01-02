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
    const lines = currentValues.map((node) => {
      switch (node.type) {
        case 'changed':
          return `Property '${depth}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'deleted':
          return `Property '${depth}${node.key}' was removed`;
        case 'added':
          return `Property '${depth}${node.key}' was added with value: ${stringify(node.value)}`;
        case 'unchanged':
          return null;
        case 'nested':
          return iter(node.children, `${depth}${node.key}.`);
        default:
          throw new Error(`Unknown type of data: ${node.type}`);
      }
    });
    const filteredContent = lines.filter((node) => node !== null);
    return filteredContent.join('\n');
  };

  return iter(arr);
};

export default plain;
