/* 入口文件man.js */
// console.log(123);
// 1.react 用来创建组件和组件生命周期相关的东西
import React from 'react';
// 2.封装了和DOM操作相关的包，比如把组件渲染到页面上
import ReactDOM from 'react-dom';
// 3.接下来安装webpack相关包和配置webpack -S webpack-dev-server html-webpack-plugin -D
// const p1 = React.createElement('p', {
// 	key: 1
// }, '张三');
// const p2 = React.createElement('p', {
// 	title: '这是一个p',
// 	key: 2
// }, '红烛');
// // const dv=React.createElement('div',null,p1,p2);
// // 另外一种写法
// const dv = React.createElement('div', null, [p1, p2]);
// ReactDOM.render(dv, document.getElementById('app'));
import App from './App.jsx';
ReactDOM.render(<App></App>, document.getElementById('app'));
