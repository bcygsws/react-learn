// 1.组件和生命周期相关包
import React from 'react';
// 导入评论子组件
import Cmt from './component/comments/Cmt.jsx';
// 导入路由相关组件
import { Link, Route, Switch, HashRouter, Redirect } from 'react-router-dom';
// 导入登录 注册子组件
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
// 定义样式
import styled from 'styled-components';
const StyleLink = styled(Link)`
	color: red;
	margin-right: 30px;
	:hover {
		color: blue;
	}
`;
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<HashRouter>
				<div>
					<StyleLink to="/login">登录</StyleLink>
					<Link to="/register">注册</Link>
					{/* 添加根路径重定向 */}
					<Redirect path="/" to="/login"></Redirect>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/register" component={Register}></Route>
					{/* 相对于vue子组件来说，只需要子组件暴露成员，当前页面导入即可，不需要类似vue中还需要在vue实例components中注册 */}
					<Cmt></Cmt>
				</div>
			</HashRouter>
		);
	}
}
