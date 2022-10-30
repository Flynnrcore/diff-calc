const stylish = (arr, replacer = ' ', spaceCount = 2) => {
  const iter = (currentValue, depth) => {
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);

    const lines = currentValue.map((obj) => {
      if (obj.type === 'nested') {
        return `${currentIndent}  ${obj.key}: ${iter(obj.children, depth + 2)}`;
      }

      switch (obj.type) {
        case 'changed':
          return `${currentIndent}- ${obj.key}: ${obj.value1}
${currentIndent}+ ${obj.key}: ${obj.value2}`;
        case 'deleted':
          return `${currentIndent}- ${obj.key}: ${obj.value}`;
        case 'added':
          return `${currentIndent}+ ${obj.key}: ${obj.value}`;
        default:
          return `${currentIndent}  ${obj.key}: ${obj.value}`;
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(arr, 1);
};

export default stylish;
