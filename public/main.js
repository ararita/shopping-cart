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
      if (product.id in this.cart) {
        if (
          this.cart[product.id].stockCount > this.cart[product.id].quantity &&
          this.cart[product.id].stockCount !== 0
        ) {
          this.cart[product.id].quantity++;
        }
      } else {
        if (product.stockCount > 0) {
          product.quantity = 1;
          Vue.set(app.cart, product.id, product);
        }
      }
      // let item = this.cart[product.id];
      // if (!item) {
      //   //Vue.set(vm.items, indexOfItem, newValue)
      //   Vue.set(app.cart, product.id, product);
      // }
      // if (item.stockCount > item.quantity && item.stockCount !== 0) {
      //   item.quantity++;
      // } else {
      //   console.log("item is out of stock");
      // }
      //------>tell user item is out of stock

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeQuantity(product) {
      if (this.cart[product.id].quantity > 1) {
        this.cart[product.id].quantity--;
      }
      //------>remove product from the cart
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
