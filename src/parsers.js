import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFileSync = (filename) => fs.readFileSync(getPath(filename));

const ParsingFile = (format, file) => (format === '.json' ? JSON.parse(readFileSync(file), 'utf-8') : yaml.load(readFileSync(file), 'utf-8'));

const getData = (file) => {
  const format = path.extname(file);
  return ParsingFile(format, file);
};

export default getData;
