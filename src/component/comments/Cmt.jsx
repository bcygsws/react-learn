// 组件创建和组件生命周期相关包
import React from 'react';
// 导入评论列表子组件
// import Commentlayout from './commentLayout.jsx';
// 1.1 在当前页面-把评论项抽离为一个单一的组件
// function CmtList(props) {
// 	console.log(props); //{user: "张三", content: "哈哈，沙发"}
// 	return (
// 		<div>
// 			<h1>用户名：{props.user}</h1>
// 			<h1>内容：{props.content}</h1>
// 			<br />
// 		</div>
// 	);
// }
// 1.2 把评论项从当前文件中抽离，封装为一个组件
import CmtList from './Cmtlist.jsx';
/* 
需求：给标题 “评论列表案例”字样字体设置为红色
问题：
1.在此处导入样式，有一定的危险性
2.样式表文件如果用标签h1,则render内部最外层return中的所有渲染DOM元素中的h1都其作用
3.为此，专门为标题中h1添加类样式（注意：react中class是类关键字，原来的类样式class变成className）
*/

import '../../css/base.scss';
import styled from 'styled-components';
// 子选择器区域和less scss语法完全一样
// const Study = styled.div`
// 	color: hotpink;
// 	p {
// 		font-size: 16px;
// 	}
// 	span {
// 		font-size: 20px;
// 		font-weight: 700;
// 	}
// `;
// 使用组件继承的方式书写
const Study = styled.div`
	color: hotpink;
`;
// 继承了父组件中声明的color属性
const Pchild = styled(Study)`
	font-size: 16px;
	border: 1px solid #ccc;
`;
// 也继承了父组件中声明的color属性
const Schild = styled(Study)`
	font-size: 24px;
	font-weight: 700;
`;

export default class Cmt extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			CommentList: [
				{ user: '张三', content: '哈哈，沙发' },
				{ user: '张三2', content: '哈哈，板凳' },
				{ user: '张三3', content: '哈哈，凉席' },
				{ user: '张三4', content: '哈哈，砖头' },
				{ user: '张三5', content: '哈哈，楼下山炮' },
			],
		};
	}
	/* 
   return  <div key={i}>
             <h1>{item.users}</h1>
            <h1>{item.content}</h1>
          </div>
  
  */
	render() {
		return (
			<div>
				<div className="box_img"></div>
				<h1 className="head_title">评论列表案例</h1>
				<Study>
					<Pchild>学而时习之</Pchild>
					<Schild>不亦乐乎</Schild>
				</Study>
				{this.state.CommentList.map((item, i) => {
					{
						/* 【属性扩散的妙用】如果属性由很多个，这样一个一个的书写，将会很繁琐，使用展开运算符... */
					}
					{
						/* 	return <CmtList user={item.user} content={item.content} key={i}></CmtList>; */
					}
					return <CmtList {...item} key={i}></CmtList>;
				})}
			</div>
		);
	}
}
