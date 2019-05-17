const axios = require('axios');

exports.getMainPage = () => {
  // let aLat = '55.85932288840268';
  // let aLong = '37.657724625662105';
  // let bLat = '55.876717';
  // let bLong = '37.662964';

  async function f1() {
    const initReq = await axios.get(`https://yandex.ru/maps/api/router/buildRoute`, {}),
      cookies = initReq.headers['set-cookie'].join(';'),
      constcsrfToken = initReq.data.csrfToken.split(':'),
      csrfTokenStart = constcsrfToken[0],
      csrfTokenEnd = constcsrfToken[1],
      testRLL = '37.60739779882813%2C55.82416031615465~37.620959047607435%2C55.79593314525986'; //coordinate of 2 points
    // const rllExample = `${aLong}%2C${aLat}~${bLong}%2C${bLat}`;

    async function getRouteInfo(type, rll) {
      const driverData = await axios.get(`https://yandex.ru/maps/api/router/buildRoute?rll=${testRLL}&csrfToken=${csrfTokenStart}%3A${csrfTokenEnd}`,
        {
          params: {
            lang: 'ru_RU',
            mode: 'best',
            results: '1',
            type,
          },
          headers: {
            Cookie: cookies
          }
        });

      const dataAboutRoute = driverData.data.data.features[0].properties.RouteMetaData;
      const resObject = {};

      for (let key in dataAboutRoute) {
        if (key === 'Distance' || key === 'WalkingDistance') {
          resObject.Distance = dataAboutRoute[key].text;
        } else if (key === 'Duration') {
          resObject.Duration = dataAboutRoute[key].text;
        } else if (key === 'type') {
          resObject.Type = dataAboutRoute[key];
        }
      }

      console.log(resObject);

    }

    await Promise.all([
      getRouteInfo('auto'),
      getRouteInfo('pedestrian'),
      getRouteInfo('masstransit'),
      getRouteInfo('bicycle'),
    ]);
    process.exit();
  }

  f1();
};
