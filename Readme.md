# weather-underground-by-zip
[![Build Status](https://travis-ci.org/Beasta/weather-underground-by-zip.svg?branch=master)](https://travis-ci.org/Beasta/weather-underground-by-zip)
[![Coverage Status](https://coveralls.io/repos/github/Beasta/weather-underground-by-zip/badge.svg?branch=master)](https://coveralls.io/github/Beasta/weather-underground-by-zip?branch=master)
![npm](https://img.shields.io/npm/dw/weather-underground-by-zip)

Retrieve weather data for a specific zipcode. No API keys required! The name is a misnomer because the app no longer uses Weather Underground.
## Installation

```
npm install weather-underground-by-zip
```

## Usage
[RunKit Example with Emoticon](https://runkit.com/beasta/runkit-npm-weather-underground-by-zip)
```js
var weather = require('weather-underground-by-zip');
var zipcode = 90210;
weather().request(zipcode, function (err, data) {
  if (err) { console.error(err) }
  else { console.log(data); }
  // { location: "San Diego, CA", temperature: 74, description: "Cloudy" }
})
```
## Running the tests

```
npm test
```

## License
MIT

