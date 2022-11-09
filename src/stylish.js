const stylish = (arr, replacer = ' ', spaceCount = 2) => {
  const stringify = (value, replace = ' ', spacesCount = 1) => {
    const iter = (currentValue, depth) => {
      if (typeof (currentValue) !== 'object' || currentValue === null) {
        return String(currentValue);
      }
      const indentSize = depth * spacesCount;
      const currentIndent = replace.repeat(indentSize);
      const bracketIndent = replace.repeat(indentSize - spacesCount);

      const arrValue = Object.entries(currentValue);
      const lines = arrValue.map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
      const result = ['{', ...lines, `${bracketIndent}}`].join('\n');

      return result;
    };

    return iter(value, 1);
  };

  const iter = (currentValue, depth) => {
    if (typeof (currentValue) !== 'object' || currentValue === null) {
      return String(currentValue);
    }

    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);

    const lines = currentValue.map((obj) => {
      if (obj.type === 'nested') {
        return `${currentIndent}${obj.key}: ${iter(obj.children, depth + 1)}`;
      }

      switch (obj.type) {
        case 'changed':
          return `${currentIndent}- ${obj.key}: ${stringify(obj.value1)}
${currentIndent}+ ${obj.key}: ${stringify(obj.value2)}`;
        case 'deleted':
          return `${currentIndent}- ${obj.key}: ${stringify(obj.value)}`;
        case 'added':
          return `${currentIndent}+ ${obj.key}: ${stringify(obj.value)}`;
        default:
          return `${currentIndent}  ${obj.key}: ${stringify(obj.value)}`;
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(arr, 2);
};

export default stylish;
