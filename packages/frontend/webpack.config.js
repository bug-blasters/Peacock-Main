module.exports = {
    // change to .tsx if necessary
    entry: './src/index.tsx',
    output: {
      filename: './bundle.js'
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        { test:/\.css$/, use:['style-loader','css-loader'] },
        { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      ]
    },
    // addition - add source-map support
    devtool: "source-map"
  }
