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
    var storedProducts = localStorage.getItem("products");

    if (storedCart) {
      //truthy if not false, undefined, "", 0
      console.log("Found a stored cart and loading it now");
      this.cart = JSON.parse(storedCart);
    }

    if (storedProducts) {
      console.log("Found stored products and loading it now");
      this.products = JSON.parse(storedProducts);
    } else {
      localStorage.setItem("products", JSON.stringify(products));
    }
  },
  computed: {
    calculateTotalPrice() {
      let items = Object.values(this.cart.items);
      let sum = 0;
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemsGroupPrice = item.price * item.quantity;
        sum += itemsGroupPrice;
      }
      return sum;

      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    calculateProductGroupPrice() {
      let items = Object.values(this.cart.items);
      let price = 0;
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        price = item.price * item.quantity;
        console.log("------price", price);
      }
      console.log("after loop price", price);
      return price;
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    // calculateTotalPrice2() {
    //   let items = Object.values(this.cart.items);
    //   // reduce((curr, acc) =>)
    //   let totalSum = items.reduce((accumulatorSum, item) => {
    //     let price = item.price * item.quantity;
    //     return price + accumulatorSum;
    //   }, 0);
    //   console.log(items);
    //   console.log(totalSum);
    //   return totalSum;
    // },
  },
  methods: {
    addToCart(product) {
      if (product.id in this.cart.items) {
        let item = this.cart.items[product.id];
        if (item.stockCount > 0) {
          item.quantity++;
          this.products[product.id].stockCount--;
          // item.stockCount--;
          this.cart.totalQuantity++;
        }
      } else {
        Vue.set(app.cart.items, product.id, product);
        Vue.set(app.cart.items[product.id], "quantity", 1);
        this.cart.items[product.id].stockCount--;
        this.cart.totalQuantity++;
      }
      // this.cart.totalQuantity++;
      // this.cart.items[product.id].stockCount--;

      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("products", JSON.stringify(this.products));
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
      localStorage.setItem("products", JSON.stringify(this.products));
    },
  },
});
