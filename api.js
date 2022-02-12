const express = require('express');
const request = require('request-promise');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

const apiKey = 'c8c534e01f417285e820f55240de65d8'
const returnScraperApiUrl =  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to Amazon Scraper API!');
});

app.get('/products/:productname/:productId', async (req, res) => {
    const  productId  = String(req.params.productId);
    const  productName  = req.params.productname;
    const { api_key } = req.query;
console.log(productName, productId)
    try {
        const response = await request(`${returnScraperApiUrl}&url=https://www.amazon.in/${productName}/dp/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));