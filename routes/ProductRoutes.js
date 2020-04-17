let mongoose = require('mongoose');
let Products = mongoose.model('Products');
let verify = require('./verifyToken')
let jwt = require('jsonwebtoken')

module.exports = (app) => {
    app.post('/makeProduct', verify, async (req, res) => {

        try {
            let token = req.header('auth-token');
            let verified = jwt.verify(token, process.env.TOKEN_SECRET);
            let newProdData = req.body;
            newProdData.account_id = verified._id;
            delete newProdData.madeProd
            let newProduct = new Products(newProdData);
            await newProduct.save()
            res.send({
                results: {
                    response: 'handeled make product request'
                }
            }).end()
        } catch (err) {
            res.status(400).send(err).end()
        }
    })

    app.get('/sellerProds', verify, async (req, res) => {
        let token = req.header('auth-token');
        let account = jwt.verify(token, process.env.TOKEN_SECRET);
        Products.find({ account_id: account._id }, async (err, data) => {
            if (err) { return res.status(400).send(err).end() }

            res.send({
                results: {
                    products: data || []
                }
            }).end()
        })
    })

    app.get('/allProds', async (req, res) => {
        try {
            let products = await Products.find() || [];
            res.send({
                results: {
                    response: 'Handeled request to retreive all products',
                    products
                }
            }).end()

        } catch (err) {
            res.status(401).send(err).end();
        }
    })

    app.put('/finishedStock/:_id', verify, async (req, res) => {
        let { _id } = req.params;
        let { stockCondition } = req.body
        Products.findByIdAndUpdate({ _id }, { stockCondition }, async (err, result) => {

            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }

        })
    })
}