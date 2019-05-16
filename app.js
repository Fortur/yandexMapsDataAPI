let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');

let yandex = require('./app/getInfoFromYandex')

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', yandex.getMainPage);

app.listen('3000');

module.exports = app;
