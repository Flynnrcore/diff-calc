import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFileSync = (filename) => fs.readFileSync(getPath(filename));

const getParse = (file) => {
  let parse;
  const format = path.extname(file);
  if (format === '.json') {
    parse = JSON.parse(readFileSync(file), 'utf-8');
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load(readFileSync(file), 'utf-8');
  }
  return parse;
};

export default getParse;
