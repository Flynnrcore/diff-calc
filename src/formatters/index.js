import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (resultCompare, type) => {
  switch (type) {
    case 'plain':
      return plain(resultCompare);
    case 'json':
      return JSON.stringify(resultCompare);
    default:
      return stylish(resultCompare);
  }
};

export default formatter;
