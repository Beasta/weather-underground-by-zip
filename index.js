var superagent = require('superagent');
var ogTitleGet = function (body) {
    var regex = /<meta property="og:title" content="([^\|]+?) \| ([0-9]+\.[0-9].+) \| ([^"]+?)" \/>/g;
    var matches;
    if ((matches = regex.exec(body)) !== null) {
        return {
            location: matches[1],
            temperature: parseFloat(matches[2]),
            description: matches[3]
        }
    }
    return {};
};
module.exports = function WeatherUnderground() {
    if (!(this instanceof WeatherUnderground)) {
        return new WeatherUnderground();
    }
    this.request = function (zipcode, callback) {
        if (!zipcode) {
            callback('Must enter a zipcode')
            return;
        }
        superagent
            .get('https://www.wunderground.com/cgi-bin/findweather/getForecast')
            .query({query: zipcode}) // query string
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, ogTitleGet(res.text));
                }
            });
    }
};
