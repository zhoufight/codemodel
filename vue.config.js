const webpack = require('webpack');
// const isProduction = process.env.NODE_ENV === 'production';

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
console.log(`BUILD_ENV: ${process.env.BUILD_ENV}`);
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
    return {
      resolve: {
        alias: {
          pxTorem: '@/assets/css/rem.scss',
        },
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
        }),
      ],
      optimization: {
        minimizer: [
          // new UglifyJsPlugin({
          //   uglifyOptions: {
          //     compress: {
          //       warnings: false,
          //       drop_console: true, // console
          //       drop_debugger: false,
          //       pure_funcs: ['console.log']// 移除console
          //     }
          //   }
          // })
        ],
      },
    };
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.10.67.94:9000', // target host
        ws: true,
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
