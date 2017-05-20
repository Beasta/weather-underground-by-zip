import * as superagent from 'superagent';


module.exports = function WeatherUnderground() {
  if (!(this instanceof WeatherUnderground)) {
    return new WeatherUnderground();
  }
  this.ogTitleGet = (body) => {
    const regex = /<meta property="og:title" content="([^|]+?) \| ([0-9]+\.[0-9].+) \| ([^"]+?)" \/>/g;
    const matches = regex.exec(body);
    if (matches !== null) {
      return {
        location: matches[1],
        temperature: parseFloat(matches[2]),
        description: matches[3],
      };
    }
    return {};
  };
  this.request = function (zipcode, callback) {
    if (!zipcode) {
      callback('Must enter a zipcode');
      return;
    }
    superagent
        .get('https://www.wunderground.com/cgi-bin/findweather/getForecast')
        .query({ query: zipcode })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, this.ogTitleGet(res.text));
          }
        });
  };
};
