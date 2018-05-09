export default {
  // 使用js文件形式可以注释
  "entry": "src/index.js",   /*指定webpack 入口文件 如果你的项目是多页类型，会希望把 src/pages 的文件作为入口。可以这样配：  "entry": "src/pages/*.js"   */
  // "disableCSSModules": false,

  //定制主题样式
  "theme": {
    // "@primary-color": "#1DA57A",
    // "@link-color": "#1DA57A",
    // "@border-radius-base": "2px",
    // "@font-size-base": "16px",
    // "@line-height-base": "1.2"
  },


  "extraBabelPlugins": [
    "dva-hmr",
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": true }]  /*自定义antd css*/
  ],

 // 配置 pxtorem 插件
//  extraPostCSSPlugins: [
//   pxtorem({
//     rootValue: 100,
//     propWhiteList: [],
//   }),
// ],
  "env": {
    //开发环境
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]
      ]
    },
    // 生产环境
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  }
}
