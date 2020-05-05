const superagent = require('superagent');

module.exports = function WeatherUnderground() {
  if (!(this instanceof WeatherUnderground)) {
    return new WeatherUnderground();
  }
  this.grabTemperature = (body) => {
    const tempRegex = /<\s*div[^>]*class="BNeawe iBp4i AP7Wnd">([^<].*?)<\s*\/\s*div>/;
    const locationRegex = /<\s*span[^>]*class="BNeawe tAd8D AP7Wnd">(.*?)<\s*\/\s*span>/;
    const infoRegex = /<\s*div[^>]*class="BNeawe tAd8D AP7Wnd">([^<][\S\s]*?)<\s*\/\s*div>/;
    let temperaturePieces = body.match(tempRegex); // match looks like this "80�F"
    if (temperaturePieces !== null) { // checking for errors if the div wasn't matched
      temperaturePieces = temperaturePieces[1].split('');
    } else {
      return 'There has been an error processing this zipcode (div was not matched in body)';
    }
    const temperatureUnit = temperaturePieces.pop();
    temperaturePieces.pop(); // remove the degrees symbol
    const temperature = parseFloat(temperaturePieces.join(''));
    const locationPieces = body.match(locationRegex)[1].split(/[\s]/);
    locationPieces.pop(); // get rid of the zipcode
    const location = locationPieces.join(' ');
    let description = body.match(infoRegex)[1].split(/[\s]/); // has a random newline
    // example: description = [ 'Tuesday', '12:42', 'PM', 'Sunny' ]
    description = description.slice(3, description.length).join(" ");
    if (temperature && location && description) {
      return {
        location,
        temperature,
        temperatureUnit,
        description,
      };
    }
    return `There has been an error processing this zipcode 
    (could not find location, temperature or description)`;
  };
  this.request = (zipcode, callback) => {
    if (!zipcode || parseInt(zipcode, 10) > 99999 || parseInt(zipcode, 10) < 0) {
      callback('Must enter a valid zipcode');
      return;
    }
    superagent
      .get(`https://www.google.com/search?q=weather+${zipcode}&oq=weather+${zipcode}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          callback(err);
        } else {
          const weatherObject = this.grabTemperature(res.res.text);
          if (typeof weatherObject === 'string') {
            callback(weatherObject); // return error
          } else {
            callback(null, this.grabTemperature(res.res.text));
          }
        }
      });
  };
};
