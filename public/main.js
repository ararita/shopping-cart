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
        if (item.stockCount > item.quantity) {
          item.quantity++;
        }
      } else {
        if (product.stockCount > 0) {
          Vue.set(app.cart.items, product.id, product);
          Vue.set(app.cart.items[product.id], "quantity", 1);
        }
      }
      this.cart.totalQuantity++;

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeQuantity(product) {
      if (this.cart.items[product.id].quantity > 1) {
        this.cart.items[product.id].quantity--;
      } else {
        Vue.delete(this.cart.items, product.id);
      }
      this.cart.totalQuantity--;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
