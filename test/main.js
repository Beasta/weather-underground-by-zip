var WeatherUnderground = require('../index.js');
var assert = require('chai').assert;
describe('WeatherUnderground', function () {
	describe('.request', function () {
		it('should return weather data for a valid zipcode', function (done) {
			WeatherUnderground().request(92122, function (err, data) {
			    assert.equal(!!data, true);
			    done();
			})
		});
        it('should return an error if no zipcode is given', function (done) {
            WeatherUnderground().request(undefined, function (err, data) {
                assert.equal(!!err, true);
                done();
            })
        });
		it('should return a number for the temperature', function (done) {
			WeatherUnderground().request(92122, function (err, data) {
				assert.isNumber(data.temperature);
				done();
			})
		});
		it('should return San Diego for 92122', function (done) {
			WeatherUnderground().request(92122, function (err, data) {
				assert.equal(data.location, 'San Diego, CA');
				done();
			})
		})
        it('should return string for a description', function (done) {
            WeatherUnderground().request(92122, function (err, data) {
                assert.isString(data.description);
                done();
            })
        })
	})
});
