import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFileSync = (filename) => fs.readFileSync(getPath(filename));

const getFormat = (filename) => path.extname(filename).slice(1);

const parsingFile = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(readFileSync(file), 'utf-8');
    case 'yml':
      return yaml.load(readFileSync(file), 'utf-8');
    case 'yaml':
      return yaml.load(readFileSync(file), 'utf-8');
    default:
      throw new Error(`Unknown format of file: ${format}`);
  }
};

const getData = (file) => {
  const formatFile = getFormat(file);
  return parsingFile(file, formatFile);
};

export default getData;
