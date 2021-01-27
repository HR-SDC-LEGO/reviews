const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'index': [
      path.resolve(__dirname, 'client', 'src', 'index.js'), path.resolve(__dirname, 'client', 'src', 'style.css')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'client', 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                'targets': 'defaults'
              }],
              '@babel/preset-react', {
                'plugins': ['@babel/plugin-proposal-class-properties']
              }
            ]
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
};