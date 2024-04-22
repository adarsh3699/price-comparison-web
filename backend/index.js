const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const cheerio = require('cheerio');

const port = 3000;
const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
const allowlist = [
	'https://comparison.bhemu.me/',
	'http://localhost:3000/',
	'http://localhost:3001/',
	'https://price-comparison-web.vercel.app/',
];

app.use(cors(allowlist));

// app.use(cors(corsOptionsDelegate));

app.get('/', async function (req, res) {
	const searchText = req.query?.search?.trim();
	const page = req.query?.page?.trim() || 1;
	if (!searchText) return res.status(400).json({ message: 'Search text is required' });

	try {
		const response = await axios.get(
			'https://pricee.com/api/v1/search.php?q=' +
				searchText +
				'&size=10&lang=en&page=' +
				page +
				'&vuid=0&platform=1'
		);
		res.send(response.data);
	} catch (error) {
		console.error('Error:', error);
		res.send(error);
	}
});

app.get('/product/*', async function (req, res) {
	const productId = req.params[0].trim();
	if (!productId) return res.status(400).json({ message: 'productId is required' });

	try {
		const response = await axios.get('https://pricee.com/api/redirect/t.php?itemid=' + productId);
		const $ = cheerio.load(response?.data);

		const refreshContent = $('meta[http-equiv="refresh"]').attr('content');
		const urlValue = refreshContent.split(';')[1].split('=')[1];

		res.send({ status: response.status, productUrl: urlValue });
	} catch (error) {
		console.error('Error:', error);
		res.send(error);
	}
});

// app.post('/flipkart', async function (req, res) {
// 	const searchText = req.body?.search?.trim();
// 	if (!searchText) return res.status(400).json('Search text is required');
// 	try {
// 		request(
// 			'https://www.flipkart.com/search?q=' +
// 				searchText?.replace(' ', '+') +
// 				'&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off:80',
// 			(err, response, body) => {
// 				if (err) console.log(err);

// 				const $ = cheerio.load(body);

// 				// Find the div with class 'content'
// 				const nameDiv = $('._4rR01T');
// 				const priceDiv = $('._1_WHN1');
// 				const hrefValue = $('._1fQZEK');
// 				const imgValue = $('._2QcLo- img');

// 				// Check if the div is found
// 				console.log(priceDiv.length, nameDiv.length);
// 				if (priceDiv.length > 0 && nameDiv.length > 0) {
// 					let itemArray = [];

// 					priceDiv.each((index, element) => {
// 						const price = $(element).text().trim();
// 						const name = $(nameDiv[index]).text().trim(); // Assuming nameDiv is available in the scope
// 						const url = 'https://www.flipkart.com' + $(hrefValue[index]).attr('href');
// 						const img = $(imgValue[index]).attr('src');
// 						itemArray.push({ index, name, price, url, img });
// 					});
// 					res.send(itemArray);

// 					// console.log("Value of the div with class 'content':", divContentValue);
// 				} else {
// 					console.log("Div with class 'content' not found.");
// 					res.status(500);
// 					res.send('Div with class content not found');
// 				}
// 			}
// 		);
// 	} catch (error) {
// 		console.log('catch:', error);
// 		res.send(error);
// 	}
// });

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});
