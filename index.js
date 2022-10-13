import fs from 'fs';
import path from 'path';

const getPath = (file) => path.resolve(process.cwd(), file);

const gendiff = (file1, file2) => {
  const firstFile = JSON.parse(fs.readFileSync(getPath(file1), 'utf-8'));
  const secondFile = JSON.parse(fs.readFileSync(getPath(file2), 'utf-8'));
  console.log(firstFile);
  console.log(secondFile);
};

export default gendiff;
