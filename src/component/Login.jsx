import React from 'react';
import styled from 'styled-components';
const H3 = styled.h3`
	width: 400px;
	height: 400px;
	background-color: #e92312;
	text-align: center;
	margin: 0;
	line-height: 400px;
`;
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<H3>这是登录页面</H3>
			</div>
		);
	}
}
