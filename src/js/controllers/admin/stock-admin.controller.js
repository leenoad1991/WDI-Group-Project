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
        product.price.deviation = parseInt(product.price.retail/product.price.livePrice*100);
        processedProducts++;
        if (processedProducts === data.length) {
          vm.products = data;
        }
      });
    });
  }
}
