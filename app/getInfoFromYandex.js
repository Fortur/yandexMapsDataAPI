const axios = require('axios');

exports.getMainPage = (req, res) => {
  let aLat = '55.85932288840268';
  let aLong = '37.657724625662105';
  let bLat = '55.876717';
  let bLong = '37.662964';
  // для аутентификации используется токен, который получается, пока не известным мне путём, либо csrfToken, с которым корректно работает Postman, но не работает axios почему-то
  let token=''; // тут записывается токен. я получал его из схожих запросов, которые кидает http://fiddle.jshell.net/4xfxR/1/show/
  async function f() {
    const driverData = await axios.get(`https://api-maps.yandex.ru/services/route/2.0/?lang=ru_RU&token=${token}&rll=${aLong}%2C${aLat}~${bLong}%2C${bLat}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 YaBrowser/19.4.2.702 Yowser/2.5 Safari/537.36'
        }
      });
    console.log(driverData.data.data.features[0].properties.RouteMetaData);

  }
  f();
};
