const request = require("postman-request");
require("dotenv").config();

// apikey
const mapboxAPIKey = process.env.MAPBOX_APIKEY;

const geocode = (address, callback) => {
	console.log(address);
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${mapboxAPIKey}&limit=1`; // encode uri

	request({ url, json: true }, (error, { body }) => {
		console.log(body);
		if (error) {
			callback("Unable to connect to geolocation service.", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location. Try another search.", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
