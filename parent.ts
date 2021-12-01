import * as fs from 'fs';

const deleteAll = (path: string) => {
  if (fs.existsSync(path)) {
    const state = fs.lstatSync(path);
    if (state.isDirectory()) {
      fs.rmdirSync(path, {
        recursive: true,
      });
    } else {
      fs.rmSync(path);
    }
  }
};

const fps = ['node_modules', 'yarn.lock', 'package-lock.json', 'pnpm-lock.yaml'];

fps.forEach(fp => deleteAll(fp));
