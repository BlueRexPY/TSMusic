/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  optimizeFonts: false,
  env:{
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.APP_SERVER_URL,
  },
  async rewrites(){
    return[
      {
        source:'/api/:path*',
        destination:'http:// localhost:4200/api/:path*',
      },
      {
        source:'/uploads/:path*',
        destination:'http:// localhost:4200/uploads/:path*',
      }
    ]
  }       
}

module.exports = nextConfig

const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({

  modifyVars: { 
    '@primary-color': '#B62FC8',
    '@text-color': '#fff',
    '@text-color-secondary': '#bdbdbd', 
    "@disabled-color": "#bdbdbd",
},
  lessVarsFilePath: './styles/variables.less',
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},

  webpack(config) {
    return config;
  },

});