const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const getBackIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount);

const stringify = (value, depth) => {
  if (typeof (value) !== 'object' || value === null) {
    return String(value);
  }

  const arrValue = Object.entries(value);
  const lines = arrValue.map(([key, val]) => `${getIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  const result = lines.join('\n');

  return `{\n${result}\n${getBackIndent(depth - 1)}}`;
};

const stylish = (arr) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((obj) => {
      if (obj.type === 'nested') {
        return `${getIndent(depth)}  ${obj.key}: {\n${iter(obj.children, depth + 1)}\n${getBackIndent(depth)}}`;
      }

      switch (obj.type) {
        case 'changed':
          return `${getIndent(depth)}- ${obj.key}: ${stringify(obj.value1, depth + 1)}\n${getIndent(depth)}+ ${obj.key}: ${stringify(obj.value2, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'added':
          return `${getIndent(depth)}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        default:
          return `${getIndent(depth)}  ${obj.key}: ${stringify(obj.value, depth + 1)}`;
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(arr, 1)}\n}`;
};

export default stylish;
