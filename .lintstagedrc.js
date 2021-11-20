const path = require('path');

module.exports = {
  '**/*': 'prettier --ignore-unknown --write',
  '**/*.+(js|jsx|ts|tsx)': (filenames) => {
    const relativeFilenames = filenames
      // Completely removes the current path(at __dirname) to an absolute path
      // By replacing the initial part of the string to nothing
      .map((x) => path.normalize(x).replace(path.resolve(__dirname), ''))
      .join(' --file ');
    return `next lint --fix --file ${relativeFilenames}`;
  },
  // Make sure to keep forward slash on stylelint
  '**/*.+(css|scss)': 'stylelint --fix',
  '**/*.ts?(x)': 'eslint --fix --plugin tsc --rule \'tsc/config: [2, {configFile: "./tsconfig.json"}]\''
};
