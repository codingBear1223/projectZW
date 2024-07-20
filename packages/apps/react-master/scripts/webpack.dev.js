const baseCfg = require("./webpack.base");
const { merge } = require("webpack-merge");
const path = require("path");

// 合并配置
module.exports = merge(baseCfg(true), {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      //托管静态资源public 文件夹
      directory: path.join(__dirname, "../public"),
    },
    compress: false, //不压缩，这样热更新更快
    port: 3000,
    open: true,
    hot: true, //热更新
    historyApiFallback: true, //解决刷新history路由404问题
  },
});
