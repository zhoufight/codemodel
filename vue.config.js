const webpack = require('webpack');
const path = require('path');

// 全局注入rem.scss
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/css/rem.scss')],
    });
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)));
  },
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
