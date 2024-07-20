const baseCfg = require("./webpack.base.js");
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(baseCfg(), {
  mode: "production",
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log", "console.warn"],
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: { name: "vendors", test: /node_modules/ },
        common: { name: "common" },
      },
    },
  },
});
