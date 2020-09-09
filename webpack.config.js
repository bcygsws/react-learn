const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin 作用：打包前清除上次打包的文件夹。注意：clean-webpack-plugin的调用采取解构赋值的方式声明，
// 如:const {cleanWebpackPlugin}
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 3.1 分离css插件
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 3.2 压缩css插件，只在mode:'production'时压缩才生效
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 4.1 压缩js插件
const uglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	// 开发时模式
	mode: 'development',
	entry: {
		// 打包的入口文件
		// app: ['@babel/polyfill', './src/main.js'],
		app: './src/main.js',
		// 第三方库的抽离，多个模块共享一个入口chunk，使用数组的形式，app中就不会抱回vendor1中列出的模块了
		vendor1: ['react', 'react-dom'],
	},
	output: {
		// 所有输出文件的目标路径
		// 必须是绝对路径，使用node.js的path模块
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]-[hash:8].js',
	},
	plugins: [
		// 声明要托管在内存(打包)html页面的模板和文件名
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		// 用于清除上一次打包的文件夹
		new CleanWebpackPlugin(), //注意：在webpack4中不需要定义要删除的是哪个文件夹，打包工具内部会根据output中的定义的path属性值进行删除就文件夹
		// 用于分离css代码，具体说来就是把打包在bundle.js中的.css .less .sass等样式文件抽离出来，打包生成新的css文件
		new miniCssExtractPlugin({
			// name是entry入口文件中声明的属性名，本配置中是app。另外，此处的filename会覆盖掉output中filename的声明文件名
			filename: 'css/[name].css',
		}),
	],
	optimization: {
		minimize: false, //为了看到效果，暂时关闭默认打开的压缩
		//为了让bundle.js中只有自己的包，把该文件中其他所有第三方包都抽离出来
		splitChunks: {
			chunks: 'all', //包含initial async all，同步异步都打包
			// minSize: 30000, //形成一个新代码块的最小体积
			// maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
			// maxInitialRequests: 3, // 最大初始化请求数
			// automaticNameDelimiter: '~', // 打包分割符
			// name:true
			cacheGroups: {
				vendors: {
					//第三方框架
					test: /[\\/]node_modules[\\/]/,
					minSize: 0, //大于0字节就拆分
					minChunks: 2, //在分割之前，这个代码块至少被引用的次数
					name: 'vendor1',
					priority: 10,
					enforce: true,
				},
			},
		},
		runtimeChunk: {
			// 把一些相关的运行文件分离出来，方便浏览器缓存，提升加载速度
			name: 'manifest',
		},
		// 压缩js和css选项
		minimizer: [
			// 用于js代码的压缩
			new uglifyJsWebpackPlugin({
				cache: true, //启用缓存，还可以启用缓存并设置缓存路径，例如：cache:'path/to/cache'
				parallel: true, //启用多进程并行 ，提升构建速度
				sourceMap: false, //souceMap启用后，将会将错误消息的位置映射到模块(会减慢压缩速度)，推荐禁用
			}),
			// 压缩css代码，只有mode:'production'时才压缩css文件
			new optimizeCssAssetsWebpackPlugin(),
		],
	},
	module: {
		rules: [
			/* 
				注意：
				1.一般提供的第三方组件框中的样式都是.css后缀的，因此，我们最好不要把提供好的组件库样式模块化
				2.在书写自己的样式时，尽量使用less sass等更加方便的css预处理工具来书写样式，只需将.less .scss .sass文件模块化即可
				*/
			// a.处理src下的样式文件
			{
				test: /\.css$/,
				include: path.resolve('./src/'),
				exclude: /node_modules/,
				use: [
					// miniCssExtractPlugin.loader相当于style-loader。style-loader的作用是将处理好的css代码存到js中，运行时嵌入
					// 到style标签中，然后挂载到页面上
					{ loader: miniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							// 以前版本开启模块化
							// modules: true,
							// localIdentName: '[name]__[local]--[hash:base64:5]',
							// webpack更新后
							modules: {
								// 重新生成的css类名
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						},
					},
					// 1.postcss工具的作用是用js代码来处理css,将css代码解析成抽象语法树(AST)，然后交给postcss的插件进行处理
					// 2.autoprefixer是postcss的插件，可以支持变量和混入，增加浏览器的声明前缀
					// 3.postcss一般不会单独使用，而是集成在构建工具中，例如：webpack、grunt、gulp中都有集成

					{ loader: 'postcss-loader' },
				],
			},
			// b.处理node_module中的样式文件
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					// miniCssExtractPlugin.loader相当于style-loader。style-loader的作用是将处理好的css代码存到js中，运行时嵌入
					// 到style标签中，然后挂载到页面上
					{ loader: miniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						// options: {
						// 	// 以前版本开启模块化
						// 	// modules: true,
						// 	// localIdentName: '[name]__[local]--[hash:base64:5]',
						// 	// webpack更新后
						// 	modules: {
						// 		// 重新生成的css类名
						// 		localIdentName: '[name]__[local]--[hash:base64:5]',
						// 	},
						// },
					},
					// 1.postcss工具的作用是用js代码来处理css,将css代码解析成抽象语法树(AST)，然后交给postcss的插件进行处理
					// 2.autoprefixer是postcss的插件，可以支持变量和混入，增加浏览器的声明前缀
					// 3.postcss一般不会单独使用，而是集成在构建工具中，例如：webpack、grunt、gulp中都有集成

					{ loader: 'postcss-loader' },
				],
			},
			{
				test: /\.less$/,
				include: path.resolve('./src/css'),
				exclude: /node_modules/,
				use: [
					{ loader: miniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{
						loader: 'less-loader',
						options: {
							//loader的额外参数
							sourceMap: true, //1.配置此选项启用 2.需要安装resolve-url-loader插件-才能正确解析sass less中的相对路径
						},
					},
					{ loader: 'postcss-loader' },
				],
			},
			{
				test: /\.scss|sass$/,
				include: path.resolve('./src/css'),
				exclude: /node_modules/,
				use: [
					{ loader: miniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{
						loader: 'less-loader',
						options: {
							//loader的额外参数
							sourceMap: true, //1.配置此选项启用 2.需要安装resolve-url-loader插件-才能正确解析sass less中的相对路径
						},
					},
					{ loader: 'postcss-loader' },
				],
			},
			{
				test: /\.jpg|jpeg|bmp|png|gif|eot|svg|ttf|woff|woff2$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							/* 
							一.在npm run dev时，走的路径是 webpack-dev-server。会做以下事情
							1.将main.js等js文件打包成bundle.js托管在内存中根目录
							2.将html托管在内存中，并将bundle.js追加到body结束标签的前面，同时将处理好的css图片放在根目录下outputPath声明的路径下，
							此处就是 / + images 下
							二.npm run pub或者webpack,走的路径是webpack，会做以下事情：
							output中声明的路径会叠加上outputPath声明的属性值，会叠加上原来的dist,变成dist/*.js dist/images/*.jpg
							*/
							outputPath: './images',
							/* 
							publicPath属性必须配置，原因是：在项目npm run dev时，样式中图片可能不显示
							原因是：分离css包时，分离的图片文件放在css文件夹下，生成的托管页面中图片的路径变成了http://localhost:3000/%20css/images/00759c6d-VDD.jpeg，
							然而，托管在内存中的图片文件是放在根目录 http://localhost:3000/+images下，publicPath调和这种路径矛盾
							*/
							publicPath: '../images',
							name: '[hash:8]-[name].[ext]',
							// 总言之，图片真实大小<limit设定值，图片打包时会转化成base64编码的形式，等到打包时不会存放于dist/images路径
							// 只有在图片内存大小 > limit设定值，打包后，图片文件才会存储在dist/images文件中。图片内存大小<limit设定值，
							// 图片会转化成base64编码，则打包后，图片不会存放在dist/images中
							/* 
								查看图片大小为：471,735比特
							*/
							limit: 471734,
						},
					},
				],
			},
			// 注意：必须匹配.js和.jsx文件，两者少写一个就将报错：还需要加载器
			{
				test: /\.js|jsx$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	// webpack性能(performance)
	// performance: {
	// 	// hints 设置打包体积过大时的提示信息，默认为warning，还可以提示 error 或者hints:false (不提示警告和错误)
	// 	hints: 'error',
	// 	// 根据入口起点的最大体积，提示何时生成性能提示？
	// 	maxEntrypointSize: 300000,
	// 	// 根据单个资源的提示，提示何时生成性能提示？
	// 	maxAssetSize: 500000,
	// },
};
