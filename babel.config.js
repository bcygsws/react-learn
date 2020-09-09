module.exports = {
	presets: [
		'@babel/preset-react',
		[
			'@babel/preset-env',
			//通过require 或者 inport 直接导入core-js包，或者在webpack配置文件的entry入口处直接配置@babel/polyfill都是全局引入，会污染词法环境，
			// 同时造成入口包体积变大。polyfill通过core-js实现按需引入，需要配置useBuiltIns和corejs选项，同时需要安装运行依赖core-js@3
			{
				useBuiltIns: 'usage',
				// core.js需要手动安装，安装core-js@3 版本，@babel/polyfill中已经包含它了
				corejs: 3, //3是core.js版本号
			},
		],
	],
	plugins: ['@babel/plugin-transform-runtime'],
};
