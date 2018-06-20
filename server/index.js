const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');

const api = require('./api');
require('./connect');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(cookieParser('blogv2'));
app.use(api); 
//因为是单页应用 所有请求都走/dist/index.html
app.get('*', function (req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})

app.listen(8088);
console.log('======Success listen at 8088!!!======');
