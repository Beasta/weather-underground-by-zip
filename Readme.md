# weather-underground-by-zip
 
Retrieve weather underground data for a specific zipcode. No API keys required!

## Installation

```
npm install weather-underground-by-zip
```

## Usage
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

