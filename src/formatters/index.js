import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (ast, type) => {
  switch (type) {
    case 'plain':
      return plain(ast);
    case 'json':
      return JSON.stringify(ast);
    case 'stylish':
      return stylish(ast);
    default:
      throw new Error(`Unknown output format: ${type}`);
  }
};

export default formatter;
