const Product = require('../models/Product');

const { formatPrice } = require('../../lib/utils')

module.exports = {
    async index(req, res) {
        const products = await Product.findAll();

        if (!products) return res.send('Products not found!');

        async function getImage(productId) {
            let files = await Product.files(productId);
            files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
            let file = files[0]
            try {
                // altera a url para funcionar com o style="background-image: url(...);")
                file = files[0].replace(/\\/g, '/')
            } catch { }
            return file
        }

        const productsPromise = products.map(async (product) => {
            product.img = await getImage(product.id)
            product.oldPrice = formatPrice(product.old_price)
            product.price = formatPrice(product.price)
            return product
        }).filter((product, index) => index <= 2)

        const lastAdded = await Promise.all(productsPromise)

        return res.render('home/index', { products: lastAdded })
    }
}