/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : ['localhost'] 
  },
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