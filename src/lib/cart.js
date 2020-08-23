const { formatPrice } = require('./utils')

const Cart = {
  init(oldCart) {
    if (oldCart) {
      this.items = oldCart.items;
      this.total = oldCart.total;
    } else {
      this.items = [];
      this.total = {
        quantity: 0,
        price: 0,
        formmattedPrice: formatPrice(0),
      }
    }

    return this;
  },
  addOne(product) {
    let inCart = this.items.find(item => item.product.id == product.id);

    if (!inCart) {
      inCart = {
        product: {
          ...product,
          formattedPrice: formatPrice(product.price),
        },
        quantity: 0,
        price: 0,
        formattedPrice: formatPrice(0),
      };

      this.items.push(inCart)
    }

    if (inCart.quantity >= product.quantity) return this;

    inCart.quantity++;
    inCart.price = inCart.product.price * inCart.quantity;
    inCart.formattedPrice = formatPrice(inCart.price);

    this.total.quantity++;
    this.total.price += inCart.product.price;
    this.total.formattedPrice = formatPrice(this.total.price);

    return this
  },
  removeOne(productId) { },
  delete(productId) { },
}

const product = {
  id: 1,
  price: 199,
  quantity: 2
}

const product2 = {
  id: 2,
  price: 5,
  quantity: 30
}


console.log(Cart.init().addOne(product).addOne(product).addOne(product).addOne(product2).addOne(product).addOne(product2));


module.exports = Cart;