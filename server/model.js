var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    id: Number,
    url: String,
    number: Number,
    title: String,
    body: String,
    labels: Array,
    created_at: String,
    updated_at: String
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;