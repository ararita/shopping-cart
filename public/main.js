var app = new Vue({
  el: "#app",
  data: {
    products: products,
    cart: {
      totalPrice: 0,
      totalQuantity: 0,
      items: {},
    },
  },
  mounted() {
    var storedCart = localStorage.getItem("cart");
    if (storedCart) {
      //truthy if not false, undefined, "", 0
      console.log("Found a stored cart and loading it now");
      this.cart = JSON.parse(storedCart);
    }
  },
  methods: {
    addToCart(product) {
      if (product.id in this.cart.items) {
        let item = this.cart.items[product.id];
        if (item.stockCount > item.quantity && item.stockCount !== 0) {
          item.quantity++;
        }
      } else {
        if (product.stockCount > 0) {
          Vue.set(app.cart.items, product.id, product);
          Vue.set(app.cart.items[product.id], "quantity", 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    // sumItemsInCart(product) {
    //   let sum = 0;
    //   for (const productId in this.cart) {
    //   }
    // },
    removeQuantity(product) {
      if (this.cart.items[product.id].quantity > 1) {
        this.cart.items[product.id].quantity--;
      } else {
        Vue.delete(this.cart.items, product.id);
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
