import stylish from './stylish.js';
import plain from './plain.js';

const getDisplay = (resultCompare, format = 'stylish') => {
  if (format === 'plain') {
    return plain(resultCompare);
  }
  return stylish(resultCompare);
};

export default getDisplay;
