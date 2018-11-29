const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/game.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
};
