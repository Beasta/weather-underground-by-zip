# weather-underground-by-zip
[![Build Status](https://travis-ci.org/Beasta/weather-underground-by-zip.svg?branch=master)](https://travis-ci.org/Beasta/weather-underground-by-zip)
[![Coverage Status](https://coveralls.io/repos/github/Beasta/weather-underground-by-zip/badge.svg?branch=master)](https://coveralls.io/github/Beasta/weather-underground-by-zip?branch=master&kill_cache=1")
![npm](https://img.shields.io/npm/dw/weather-underground-by-zip)

Retrieve weather data for a specific zipcode. No API keys required! The name is a misnomer because the app no longer uses Weather Underground.
## Installation

```
npm install weather-underground-by-zip
```

## Usage
[RunKit Example](https://runkit.com/beasta/5ebc502a2716cb001301c3c2)
```js
const weather = require('weather-underground-by-zip')();
const zipcode = 90210;

await require("util").promisify(weather.request)(zipcode);
//{description: "Partly cloudy", location: "Beverly Hills, CA", temperature: 68, temperatureUnit: "F"}
```
## Running the tests

```
npm test
```

## License
MIT

