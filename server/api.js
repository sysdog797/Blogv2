const express = require('express');
const request = require('request');
const router = express.Router();

var Article = require('./model');
var duration = 3600000; // 一小时

// 定时载入更新数据
setInterval(() => {
    console.log('Automatic update article list!');
    handleUpdate();
}, duration)

function handleUpdate(){
    var options = {
        url: 'https://api.github.com/repos/sysdog797/syscoding/issues',
        encoding: 'utf8',
        headers: {'User-Agent': 'request'}
    };
    request(options, (error, response, body) => {
        const list = JSON.parse(body);
        for(let issue of list){
            Article.update({number: issue.number}, {$set: {
                id: issue.id,
                url: issue.url,
                number: issue.number,
                title: issue.title,
                body: issue.body,
                labels: issue.labels,
                created_at: issue.created_at,
                updated_at: issue.updated_at
            }}, {upsert: true}, (err) => {
                console.log('Update article-' + issue.number + ' status: ', err ? 'failed' : 'success');
            });
        }
    });
}

router.get('/api/updateList/', () => { handleUpdate(); });

// 获取列表
router.get('/api/getList/:page', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let page = req.params.page;
    Article.find({}, null, {sort: {number: -1}, skip: (page - 1) * 4, limit: 4}, (err, result) => {
        if(err){
            console.log('error message: ' + err);
            res.status(400).send('Bad request: ' + err);
            return;
        }
        res.status(200).send(result);
    });
});

// 获取文章
router.get('/api/getArticle/:number', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let number = req.params.number;
    Article.findOne({number: number}, (err, result) => {
        if(err){
            console.log('error message: ' + err);
            res.status(400).send('Bad request: ' + err);
            return;
        }
        res.status(200).send(result);
    });
});

module.exports = router;