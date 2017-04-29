/* global describe */
/* global it */

const WeatherUnderground = require('../build/index.js');
const assert = require('chai').assert;

describe('WeatherUnderground', () => {
  describe('.request', () => {
    it('should return weather data for a valid zipcode', (done) => {
      WeatherUnderground().request(92122, (err, data) => {
        assert.equal(!!data, true);
        done();
      });
    });
    it('should return an error if no zipcode is given', (done) => {
      WeatherUnderground().request(undefined, (err) => {
        assert.equal(!!err, true);
        done();
      });
    });
    it('should return a number for the temperature', (done) => {
      WeatherUnderground().request(92122, (err, data) => {
        assert.isNumber(data.temperature);
        done();
      });
    });
    it('should return San Diego for 92122', (done) => {
      WeatherUnderground().request(92122, (err, data) => {
        assert.equal(data.location, 'San Diego, CA');
        done();
      });
    });
    it('should return string for a description', (done) => {
      WeatherUnderground().request(92122, (err, data) => {
        assert.isString(data.description);
        done();
      });
    });
  });
});
