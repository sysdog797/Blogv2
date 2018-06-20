// 引入编写好的api
const api = require('./api');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser');
// 引入Express
const express = require('express');
// 连接mongo数据库
require('./connect');

//var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))

//app.use(cookieParser('blogv2'));
//session 中间件
app.use(session({
    name: 'Blog2.0', // 设置 cookie 中保存 session id 的字段名称
    secret: 'Blog2.0', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: 6000000
    }, // 过期时间，过期后 cookie 中的 session id 自动删除
    resave: false,
    saveUninitialized: true
}));

app.use(api); // 一定要放在session后面session注册才会生效

//因为是单页应用 所有请求都走/dist/index.html
app.get('*', function (req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})
// 监听8088端口
app.listen(8088);
console.log('======Success listen at 8088!!!======');
