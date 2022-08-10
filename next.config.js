const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  modifyVars: { '@primary-color': '#04f' }, // optional
  lessVarsFilePath: './src/styles/variables.less', // optional 
  lessVarsFilePathAppendToEndOfContent: false, // optional
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
    // ... 
    mode: "local",
    localIdentName:"[local]--[hash:base64:4]", //__DEV__ ? "[local]--[hash:base64:4]" : "[hash:base64:8]", // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
    exportLocalsConvention: "camelCase",
    exportOnlyLocals: false,
    // ...
    getLocalIdent: (context, localIdentName, localName, options) => {
      return "whatever_random_class_name";
    },
  },
  // for Next.js ONLY
  nextjs: {
   // default false, for easy to debug on PROD mode
    reactStrictMode: false,
    async rewrites(){
      return [
        {
          source:'/get/:path*',
          destination:'http://web3dviewer_worker.lss3070.workers.dev/:path*'
        },
        {
          source:'/test',
          destination:'https://naver.com'
        },
               {
          source:'/test',
          destination:'https://naver.com'
        },
      ]
    }
  },
  // Other Config Here...
  webpack:(config,{isServer})=>{
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
  })
    return config
  },
  env:{
    BASE_URL: process.env.BASE_URL,
  },
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack:(config)=>{
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//   })
//     return config
//   },
//   env:{
//     BASE_URL: process.env.BASE_URL,
//   }
// }

// module.exports = nextConfig
