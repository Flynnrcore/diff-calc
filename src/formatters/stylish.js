const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const getBackIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount);

const stringify = (value, depth) => {
  if (typeof (value) !== 'object' || value === null) {
    return String(value);
  }

  const values = Object.entries(value);
  const lines = values.map(([key, val]) => `${getIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  const result = lines.join('\n');

  return `{\n${result}\n${getBackIndent(depth - 1)}}`;
};

const stylish = (arr) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((obj) => {
      switch (obj.type) {
        case 'changed':
          return [`${getIndent(depth)}- ${obj.key}: ${stringify(obj.value1, depth + 1)}`, `${getIndent(depth)}+ ${obj.key}: ${stringify(obj.value2, depth + 1)}`].join('\n');
        case 'deleted':
          return `${getIndent(depth)}- ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'added':
          return `${getIndent(depth)}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'nested':
          return `${getIndent(depth)}  ${obj.key}: {\n${iter(obj.children, depth + 1)}\n${getBackIndent(depth)}}`;
        default:
          return `${getIndent(depth)}  ${obj.key}: ${stringify(obj.value, depth + 1)}`;
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(arr, 1)}\n}`;
};

export default stylish;
