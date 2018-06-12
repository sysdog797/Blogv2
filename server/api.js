const express = require('express');
var path = require('path');

// remarkable
const Remarkable = require('remarkable');
var md = new Remarkable();

var request = require('request');
const router = express.Router();

// 获取文章
router.get('/api/getArticle/:id', (req, res) => {
    var id = req.params.id;
    console.log('request begin...')
    var options = {
        //url: '/static/mock-data.json'
        url: 'https://api.github.com/repos/sysdog797/syscoding/issues/' + id,
        headers: {
            'User-Agent': 'request'
        }
    };
    request(options, function (error, response, body) {
        console.log(response)
        if (!error && response.statusCode == 200) {
            var content = JSON.parse(body);
            var body = md.render(content.body);
            var result = {
              body: body,
              user: content.user.login,
              title: content.title,
              created: content.created_at,
              number: content.number
            }
            console.log(result)
            res.send(result);
        }
    })
})

module.exports = router;