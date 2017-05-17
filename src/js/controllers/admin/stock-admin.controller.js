angular
.module('wineApp')
.controller('StockViewCtrl', StockViewCtrl);

StockViewCtrl.$inject = ['Product'];
function StockViewCtrl(Product) {
  const vm = this;
  stockIndex();
  function stockIndex() {
    vm.products = Product.query().$promise.then(data => {
      let processedProducts = 0;
      data.forEach(product => {
        product.price.deviation = parseInt(product.price.livePrice/product.price.retail*100);
        processedProducts++;
        if (processedProducts === data.length) {
          vm.products = data;
          console.log(vm.products.length);
          sortProducts(vm.products);
        }
      });
      function sortProducts(products){
        products.sort(function(a, b) {
          return b.price.deviation - a.price.deviation;
        });
      }
    });
  }
}
