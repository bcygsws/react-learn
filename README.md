# React 项目的构建过程

## 项目初始化

-   新建文件夹，在里面建一个子文件 src,src 下 main.js 文件
-   在项目根路径，npm init -y,生成 package.json 文件
-   在 main.js 中写一代代码，测试命令为：node ./src/main.js

## 安装 babel

-   安装开发依赖：@babel/cli、@babel/core、 @babel/preset-env、 @babel/plugin-transform-runtime、 babel-loader、@babel/preset-react
-   安装运行依赖：@babel/polyfill babel 只转译新标准的语法（比如 ES6 箭头函数转译为 ES5 中的函数），而新标准引入的原生对象、原生对象的部分原型方法、新增的 API（Proxy、Set 等），这些 babel 是不会转译的，需要自行安装 polyfill 来解决
-   在根目录创建 babel 的配置文件 babel.config.js
-   module.exports = {
-   presets: ['@babel/preset-react', '@babel/preset-env'],
-   plugins: ['@babel/plugin-transform-runtime'],
-   };

## 安装 webpack 相关插件

-   安装运行依赖：webpack
-   安装开发依赖：webpack-dev-server html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
-   配置协助打包的加载器 loader
    -   css:style-loader css-loader
    -   less:less less-loader
    -   sass:sass sass-loader
    -   图片或字体图标文件：url-loader file-loader
    -   /\.js|jsx\$/文件：babel-loader
    -   用 js 将 css 解析成抽象语法树 AST，然后利用 postcss 进行预处理，webpack 集成了 postcss,安装 postcss-loader 以及 postcss 的一个自动加前缀的插件 autoprefixer
    -   编写 postcss 的配置文件 postcss.config.js
    -   module.exports = {
    -   plugins: {
    -                 // autoprefixer为不同版本的浏览器加入前缀
    -                 autoprefixer: {
    -                 	overrideBrowserslist: [
    -                 		// 除了浏览器的版本，>1%表示全球使用率超过1%的浏览器，这里面没有设置该参数
    -                 		'Android 4.1',
    -                 		'iOS 7.1',
    -                 		'Chrome > 31',
    -                 		'ff > 31',
    -                 		'ie >= 8',
    -                 		'last 10 versions', // 所有主流浏览器最近的10个版本用
    -                 	],
    -                 	grid: true,
    -                 },
    -   },
    -   };
-   编写 webpack 的配置文件 webpack.config.js,同时需要在 package.json 做一些配置，如："dev":"webpack-dev-server --open --port 3000 --hot"

## 经过上面三步可以完成 React 项目的基本配置
