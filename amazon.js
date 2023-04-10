const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

router.get("/",  (req, res)=> {
    res.json({status: "amazon web site"})
})

router.get("/:product", (req, res)=> {
    axios.get(`https://amazon.in/s?k=${req.params.product}`)
    .then((response)=> {
        const $ = cheerio.load(response.data)
        const results = []
        $('div[data-component-type="s-search-result"]').each((index, element) => {
            const product = {}
            product.name = $(element).find('.s-title-instructions-style').text()
            product.rating = $(element).find('i').text()
            const priceSpan = $(element).find('span.a-price')
            product.price = $(priceSpan).find('.a-price-symbol').text() + $(priceSpan).find('.a-price-whole').text()
            const imgSpan = $(element).find('span[data-component-type="s-product-image"]')
            product.image = $(imgSpan).find('img').attr('src')
            results.push(product)
        })
        res.json({results: results, success: true}).status(200)
    })
    .catch((err)=> {
        res.json({results: "failed to fetch result", success: false}).status(500)
    })
})

module.exports = router;