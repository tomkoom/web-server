const path = require("path");
const express = require("express");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const pubDirPath = path.join(__dirname, "../public");

app.use(express.static(pubDirPath));

app.get("/weather", (req, res) => {
	res.send({
		key1: "v1",
		key2: "v2",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
