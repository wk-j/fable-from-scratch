var path = require("path");
var webpack = require("webpack");
function resolve(filePath) {
  return path.join(__dirname, filePath)
}
// This is configuration used by both Babel and 
// the fable-loader to generate ES2015
var babelOptions = {
  presets: [["es2015", { "modules": false }]],
  plugins: ["transform-runtime"]
};
var isProduction = process.argv.indexOf("-p") >= 0;
console.log("Bundling for " + (isProduction ? "production" : "development") + "...");
module.exports = {
  devtool: "source-map", // Generates source maps
  entry: resolve('./FableFromScratch.fsproj'), // Entry point for webpack
  output: { // The file to output and the directory to place it in
    filename: 'bundle.js',
    path: resolve('./public'),
  },
  resolve: {
    modules: [
      "node_modules", resolve("./node_modules/")
    ]
  },
  devServer: {
    contentBase: resolve('./public'), // Dev server root directory. public becomes http://localhost:8080/
    port: 8080 // Port to run dev server on
  },
  module: {
    rules: [
      {
        test: /\.fs(x|proj)?$/, // regex test for which files will be processed by fable-loader
        use: {
          loader: "fable-loader",
          options: {
            babel: babelOptions,
            define: isProduction ? [] : ["DEBUG"]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        },
      }
    ]
  }
};