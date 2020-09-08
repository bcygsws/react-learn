import React from 'react';
// 1. 我们jsx书写html,那么，对于用js书写html，使用react组件 styled-components?
import styled from 'styled-components';
// 1.1 既然是组件的方式来书写样式，那么组件名称首字母也必须大写
const H4 = styled.h4`
	font-size: 14px;
	color: green;
`;
// 不生效的原因：webpack把cmt.js样式js文件打包到bundle.js中去了
// import styleFile from './cmt.js';
const styleFile = {
	dvStyle: { lineHeight: 34 + 'px', color: 'blue', padding: 10 + 'px' },
	h1Style: { color: 'pink', border: '1px solid #ccc' },
	h3Style: { color: 'hotpink', border: '2px solid #000' },
};
export default function CmtList(props) {
	console.log(props); //{user: "张三", content: "哈哈，沙发"}
	// 在让react中如果要写行内样式，不能像其他框架或者技术中书写，而应该采用在自己的规则：
	// 1.必须使用{{}} 其中外层括号表示要写js代码的声明，内层是键值对方式的样式
	// 2.有短线连接的样式属性，需要转换为驼峰命名法 例如：写line-height在此处是不合法的

	// 第二种方式定义的样式对象
	// const dvStyle = { lineHeight: 34 + 'px', color: 'blue', padding: 10 + 'px' };
	// const h1Style = { color: 'pink', border: '1px solid #ccc' };
	// const h3Style = { color: 'hotpink', border: '2px solid #000' };
	// 第一种形式：直接在标签内书写style样式对象
	// return (
	// 	<div style={{ lineHeight: 34 + 'px', color: 'blue', padding: 10 + 'px' }}>
	// 		{/* <div style={{ lineHeight: 34 + 'px', color: 'blue', padding: 10 + 'px' }}> */}
	// 		{/* <div style="font-size:14px;color:'blue'"> */}
	// 		<h1 style={{color:'pink',border:'1px solid #ccc'}}>用户名：{props.user}</h1>
	// 		<h3 style={{color:'hotpink',border:'2px solid #000'}}>内容：{props.content}</h3>
	// 	</div>
	// );
	// 第二种方式：将标签内style样式对象抽离出来，以字面量的方式定义该对象
	// return (
	// 	<div style={dvStyle}>
	// 		{/* <div style={{ lineHeight: 34 + 'px', color: 'blue', padding: 10 + 'px' }}> */}
	// 		{/* <div style="font-size:14px;color:'blue'"> */}
	// 		<h1 style={h1Style}>用户名：{props.user}</h1>
	// 		<h3 style={h3Style}>内容：{props.content}</h3>
	// 	</div>
	// );
	// 第三种方式：为了防止变量勿让，原则上js代码中尽量少的定义全局变量。我们可以把这个对象放置在一个单独的js文件，进一步抽离为一个模块
	{
		/* const styleAll = {
		dvStyle: { lineHeight: 34 + 'px', color: 'blue', padding: 10 + 'px' },
		h1Style: { color: 'pink', border: '1px solid #ccc' },
		h3Style: { color: 'hotpink', border: '2px solid #000' },
	}; */
	}
	return (
		<div style={styleFile.dvStyle}>
			{/* <div style={{ lineHeight: 34 + 'px', color: 'blue', padding: 10 + 'px' }}> */}
			{/* <div style="font-size:14px;color:'blue'"> */}
			<h1 style={styleFile.h1Style}>用户名：{props.user}</h1>
			<h3 style={styleFile.h3Style}>内容：{props.content}</h3>
			{/* 先写好样式组件，最后替换jsx中标签名称 */}
			<H4>拂堤杨柳醉春烟</H4>
		</div>
	);
}
