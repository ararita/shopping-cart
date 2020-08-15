var app = new Vue({
  el: "#app",
  data: {
    products: products,
    cart: {
      // totalPrice: 0,
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
  computed: {
    calculateTotalPrice() {
      let items = Object.values(this.cart.items);
      let sum = 0;
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let price = item.price * item.quantity;
        sum += price;
      }
      return sum;
    },
    calculateTotalPrice2() {
      let items = Object.values(this.cart.items);
      // reduce((curr, acc) =>)
      let totalSum = items.reduce((accumulatorSum, item) => {
        let price = item.price * item.quantity;
        return price + accumulatorSum;
      }, 0);
      console.log(items);
      console.log(totalSum);
      return totalSum;
    },
  },
  methods: {
    addToCart(product) {
      if (product.id in this.cart.items) {
        let item = this.cart.items[product.id];
        if (item.stockCount > 0) {
          item.quantity++;
        }
      } else {
        Vue.set(app.cart.items, product.id, product);
        Vue.set(app.cart.items[product.id], "quantity", 1);
      }
      this.cart.totalQuantity++;
      this.cart.items[product.id].stockCount--;

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    removeQuantity(product) {
      let item = this.cart.items[product.id];
      console.log("item", item);
      if (item.quantity > 1) {
        item.quantity--;
        this.cart.totalQuantity--;
        item.stockCount++;
      } else {
        Vue.delete(this.cart.items, product.id);
        this.cart.totalQuantity--;
        item.stockCount++;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
