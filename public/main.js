var app = new Vue({
  el: "#app",
  data: {
    products: products,
    cart: {},
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
      let item = this.cart[product.id];
      if (!item) {
        //Vue.set(vm.items, indexOfItem, newValue)

        Vue.set(app.cart, product.id, {
          name: product.name,
          price: product.price,
          // currency: product.currency,
          quantity: 1,
          stockCount: product.stockCount,
        });
      } else {
        // while (item.quantity )
        item.quantity++;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeQantity(product) {
      // Vue.set(app.cart, product.id, {
      //   quantity: product.quantity,
      // });
      if (this.cart[product.id].quantity > 1) {
        this.cart[product.id].quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
