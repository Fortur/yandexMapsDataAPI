let express = require('express');
let yandex = require('./app/getInfoFromYandex');

let app = express();

app.listen('3000');

yandex.getMainPage();

module.exports = app;
