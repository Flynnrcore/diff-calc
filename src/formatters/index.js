import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (ast, type) => {
  switch (type) {
    case 'plain':
      return plain(ast);
    case 'json':
      return JSON.stringify(ast);
    default:
      return stylish(ast);
  }
};

export default formatter;
