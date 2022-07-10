const request = require("postman-request");
require("dotenv").config();

// apikey
const weatherstackAPIKey = process.env.WEATHERSTACK_APIKEY;

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${weatherstackAPIKey}&query=${
		latitude + "," + longitude
	}&units=m`; // &units=m - celsius
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service.", undefined);
		} else if (body.error) {
			callback("Unable to find location.", undefined);
		} else {
			const data = body;
			const dataCurr = data.current;
			callback(
				undefined,
				"It is currently " + dataCurr.temperature + " degrees out. There is a " + dataCurr.precip + "% chance of rain."
			);
		}
	});
};

module.exports = forecast;
