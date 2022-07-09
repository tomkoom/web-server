const path = require("path");
const express = require("express");
const hbs = require("hbs");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

// paths
const pubDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// static dir
app.use(express.static(pubDirPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		helpText: "Help text.",
	});
});

app.get("/weather", (req, res) => {
	res.send({
		key1: "v1",
		key2: "v2",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		errorMsg: "Help article not found.",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		errorMsg: "Page not found.",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
