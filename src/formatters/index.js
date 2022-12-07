import stylish from './stylish.js';
import plain from './plain.js';

const getDisplay = (resultCompare, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(resultCompare);
    case 'json':
      return JSON.stringify(resultCompare);
    default:
      return stylish(resultCompare);
  }
};

export default getDisplay;
