angular
  .module('wineApp')
  .service('TotalValueService', TotalValueService);


TotalValueService.$inject = ['Product'];
function TotalValueService(Product) {
  const vm = this;
  vm.getTotalValue = getTotalValue;

function getTotalValue(){
  Product.query().$promise.then(products => {
    vm.totalStockValue = 0;
    vm.counter = 0;
    products.forEach(product => {
      const value =  product.stock.originalStock * product.prices.retail;
      vm.totalStockValue = vm.totalStockValue + value;
      vm.counter ++;
    });
    if (vm.counter === products.length) {
      return vm.totalStockValue;
    }
  });
}


}
