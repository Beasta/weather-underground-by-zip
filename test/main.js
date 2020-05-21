/* global describe */
/* global it */
/* global beforeEach */

const { assert } = require('chai');
const nock = require('nock');
const WeatherUnderground = require('../build/index.js');

describe('WeatherUnderground', () => {
  describe('.request', () => {
    it('should return an error for an invalid body', (done) => {
      const badBodyResponse = WeatherUnderground().grabTemperature('this is a nonsense body without a proper og:title');
      assert.deepEqual(typeof badBodyResponse, 'string');
      done();
    });
    it('should return weather data for a valid zipcode', (done) => {
      WeatherUnderground().request(92122, (err, data) => {
        assert.equal(!!data, true);
        done();
      });
    });
    it('should return an error for an invalid zipcode', (done) => {
      WeatherUnderground().request(92, (err) => {
        assert.equal(!!err, true);
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
  describe('404 tests', () => {
    beforeEach(() => {
      nock('https://www.google.com')
        .get('/search')
        .reply(404);
    });
    it('should return an error for a 404', (done) => {
      WeatherUnderground().request(92122, (err) => {
        assert.equal(!!err, true);
        done();
      });
    });
  });
});
