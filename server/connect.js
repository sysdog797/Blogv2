var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/syscoding';

mongoose.connect(url).then(() => {
    console.log('Database connection success!');
}, (err) => {
    console.log('Database connection error: ' + err);
});
