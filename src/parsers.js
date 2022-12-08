import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFileSync = (filename) => fs.readFileSync(getPath(filename));

const getParse = (file) => {
  const format = path.extname(file);
  if (format === '.json') {
    return JSON.parse(readFileSync(file), 'utf-8');
  }
  return yaml.load(readFileSync(file), 'utf-8');
};

export default getParse;
