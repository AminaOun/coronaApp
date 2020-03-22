// Import the modules we need
const rp = require('request-promise');
const cheerio = require('cheerio');

// Define the URLS we will be scraping
const baseURL = 'https://www.worldometers.info/coronavirus/';
arr = [];
// Define the method for collecting the data
const getCountriesData = async () => {
	const html = await rp(baseURL);
	const tableHead = cheerio('#maincounter-wrap', html)
		.map(function() {
			arr.push(cheerio(this).html());
			//console.log(cheerio(this).html());
		})
		.toArray();
	console.log(arr);
};
getCountriesData();

const express = require('express');
const app = express();
const port = 3055;

app.get('/', (req, res) => {
	getCountriesData();
	res.send(arr);
});

app.listen(process.env.PORT || 3055, () => console.log(`Example app listening on port ${port}!`));
