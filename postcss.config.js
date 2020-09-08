module.exports = {
	plugins: {
		// autoprefixer为不同版本的浏览器加入前缀
		autoprefixer: {
			overrideBrowserslist: [
				// 除了浏览器的版本，>1%表示全球使用率超过1%的浏览器，这里面没有设置该参数
				'Android 4.1',
				'iOS 7.1',
				'Chrome > 31',
				'ff > 31',
				'ie >= 8',
				'last 10 versions', // 所有主流浏览器最近的10个版本用
			],
			grid: true,
		},
	},
};
