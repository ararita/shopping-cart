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
      // if (product.stockCount <= 0) {
      //   return;
      // }
      if (product.id in this.cart.items) {
        let item = this.cart.items[product.id];
        if (item.stockCount > 0) {
          item.quantity++;
          this.cart.totalQuantity++;
          this.cart.items[product.id].stockCount--;
        }
      } else {
        Vue.set(app.cart.items, product.id, product);
        Vue.set(app.cart.items[product.id], "quantity", 1);
        this.cart.totalQuantity++;
        this.cart.items[product.id].stockCount--;
      }

      // this.cart.items[product.id].stockCount--;

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    calculateTotalPrice(product) {},
    removeQuantity(product) {
      let item = this.cart.items[product.id];
      if (item.quantity > 1) {
        item.quantity--;
        this.cart.totalQuantity--;
        item.stockCount++;
      } else {
        Vue.delete(this.cart.items, product.id);
        this.cart.totalQuantity--;
        item.stockCount++;
      }
      // item.stockCount++;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
