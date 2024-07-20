const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
//node 执行，使用cjs模块化语法

module.exports = function (isDev) {
  return {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "static/js/[name].[hash:8].js",
      clean: true,
      publicPath: "/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/, // 匹配.tsx 和.ts 文件
          use: {
            loader: "babel-loader",
          },
          exclude: /node_modules/,
        },

        {
          oneOf: [
            {
              test: /\.(css)$/,
              //postcss-loader 用于处理语法转换，postcss就是css界的babel
              //css-loader 主要处理路径
              //style-loader 是帮我们把css的属性，放到元素的内联样式上
              //dev 环境中，css嵌套在style标签中，可以方便热替换
              //prod 环境中，我们希望使用mini-css-extract-plugin，
              //帮我们单独抽离出来，压缩，方便缓存
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
              ],
            },

            {
              test: /\.module\.(css|less)$/,
              include: [path.resolve(__dirname, "../src")],
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      localIdentName: isDev
                        ? "[path][name]__[local]--[hash:base64:5]"
                        : "[hash:base64:8]",
                    },
                  },
                },
                "postcss-loader",
                {
                  loader: "less-loader",
                  options: { lessOptions: { javascriptEnabled: true } },
                },
              ],
            },
            {
              test: /\.(less)$/,
              //postcss-loader 用于处理语法转换，postcss就是css界的babel
              //css-loader 主要处理路径
              //style-loader 是帮我们把css的属性，放到元素的内联样式上
              //dev 环境中，css嵌套在style标签中，可以方便热替换
              //prod 环境中，我们希望使用mini-css-extract-plugin，
              //帮我们单独抽离出来，压缩，方便缓存
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "less-loader",
                "css-loader",
                "postcss-loader",
              ],
            },
          ],
        },
        {
          //webpack5 以前要单独的 loader（url, file）去处理，现在内置了
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/,
          generator: {
            // 输出的图片名称
            filename: "static/images/[name].[contenthash:8][ext]",
            // 输出的图片路径
            publicPath: "/images",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          generator: {
            // 输出的字体名称
            filename: "static/fonts/[name].[contenthash:8][ext]",
            // 输出的字体路径
            publicPath: "/fonts",
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          generator: {
            // 输出的音频名称
            filename: "static/media/[name].[contenthash:8][ext]",
            // 输出的音频路径
            publicPath: "/media",
          },
        },
      ],
    },

    plugins: [
      new HTMLWebpackPlugin({
        //把我们的js和css注入到一个 html 模板里
        template: path.resolve(__dirname, "../public/index.html"),
        //把js和css 自动注入到html的body中
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: isDev
          ? "static/css/[name].css"
          : "static/css/[name].[contenthash:8].css",
      }),
    ],
  };
};
