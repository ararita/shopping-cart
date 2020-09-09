var app = new Vue({
  el: "#app",
  data: {
    products: products,
    cart: {
      items: {},
    },
  },
  mounted() {
    var storedCart = localStorage.getItem("cart");
    var storedProducts = localStorage.getItem("products");

    if (storedCart) {
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
      return sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },

    cartTotalQuantity() {
      const cartItems = Object.values(this.cart.items);
      return cartItems.reduce((cartTotalQuantity, currentItem) => {
        return cartTotalQuantity + currentItem.quantity;
      }, 0);
    },
  },
  methods: {
    addToCart(product) {
      if (product.id in this.cart.items) {
        let item = this.cart.items[product.id];
        if (item.stockCount > 0) {
          item.quantity++;
          // this.products[product.id].stockCount--;
          item.stockCount--;
        }
      } else {
        Vue.set(app.cart.items, product.id, product);
        Vue.set(app.cart.items[product.id], "quantity", 1);
        this.cart.items[product.id].stockCount--;
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("products", JSON.stringify(this.products));
    },

    removeQuantity(product) {
      let item = this.cart.items[product.id];
      console.log("item", item);
      if (item.quantity > 1) {
        item.quantity--;
        item.stockCount++;
      } else {
        Vue.delete(this.cart.items, product.id);
        item.stockCount++;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    calculateProductGroupPrice(product) {
      let groupPrice = product.price * product.quantity;
      return groupPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },
  },
});
