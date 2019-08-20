const path = require("path");
const devMode = process.env.NODE_ENV !== "production";

// Defines the plugins for file compiling
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FontminPlugin = require("fontmin-webpack");

module.exports = {
  // Defines the files that will be compressed and compiled
  entry: {
    script: "./assets/src/scripts/main.js",
    style: "./assets/src/styles/main.scss"
  },
  // What the compiled files names and locations will be
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "assets/dist")
  },
  node: {
    fs: "empty",
    child_process: "empty"
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
              reloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  externals: {
    jquery: "jQuery"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].min.css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].min.css" : "[id].[hash].css",
      moduleFilename: ({ name }) => `${name.replace("/js/", "/css/")}.min.css`
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new FontminPlugin({
      autodetect: true, // automatically pull unicode characters from CSS
      glyphs: ["\uf0c8" /* extra glyphs to include */]
    })
  ]
};
