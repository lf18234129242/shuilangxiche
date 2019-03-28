// vue.config.js
module.exports = {
    baseUrl: '/',           // 基本路径
    outputDir: 'dist',       //打包后的输出目录
    assetsDir: "static",  //把打包文件放到static文件夹内，更美观一些。
    // indexPath: "index.html",
    filenameHashing: true, //Default: true ,生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    productionSourceMap: false, //加速生产环境构建
    css: {
      modules: false, //Default: false, 设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
      sourceMap: false //Default: false, 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
      // extract: false, //Default: 生产环境下是 true，开发环境下是 false.是否将组件中的 CSS 提取至一个独立的 CSS 文件中
      // loaderOptions: {} //Default: {}, 向 CSS 相关的 loader 传递选项
    },
    devServer:{//代理
        port:8080,
        proxy:'http://www.ichevip.com/view/index.html'
    },
  }