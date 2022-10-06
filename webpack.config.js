// 引入一个包
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack 中的所有配置信息都写在里面
module.exports = {
  // ? 指定入口文件
  entry: "./src/index.ts",

  // * 指定打包文件所在的目录
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",  // 打包后文件的文件

    // 不使用箭头函数
    environment: {
      arrowFunction: false,
      const: false
    }
  },

  mode: "development",

  // * 指定webpack打包时候要使用的模块
  module: {
    // * 指定要加载的规则
    rules: [
      {
        test: /\.ts$/, // ? test指定的是规则生效的文件
        use: [  // ? 要使用的loader
          // ? 配置babel
          {
            loader: 'babel-loader',
            options: {
              // * 设置预定义的环境
              presets: [
                [
                  // * 指定环境的插件
                  "@babel/preset-env",
                  // * 配置信息
                  {
                    targets: { // 要兼容的浏览器
                      "chrome": "86",
                      "ie": "11"
                    },
                    "corejs": "3", // 指定corejs的版本
                    "useBuiltIns": "usage" // 使用corejs的方式 'usage' 表示按需加载
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: "/node_modules/"   // ? 要排除的文件
      },

      // * less/sass 文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 在这里引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.sass$/,
        use: [
          "style-loader",
          "css-loader",
          // 在这里引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader"
        ]
      },

    ]
  },

  // ? 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "TrustheProcess"
      template: "./src/index.html"
    }),

  ],

  // * 用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}
