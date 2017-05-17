angular
  .module('wineApp')
  .service('TotalValueService', TotalValueService);


TotalValueService.$inject = ['Product'];
function TotalValueService(Product) {
  const vm = this;
  vm.getTotalValue = getTotalValue;
  vm.totalStockValue = 0;

function getTotalValue(){
  Product.query().$promise.then(products => {
    vm.totalStockValue = 0;
    vm.counter = 0;
    products.forEach(product => {
      // console.log(product);
      // const value =  product.stock.originalStock * product.prices.retail;
      const value =  1 * product.price.retail;
      vm.totalStockValue = vm.totalStockValue + value;
      vm.counter ++;
      // console.log(vm.totalStockValue);
      // console.log(vm.counter);
    });
    if (vm.counter === products.length) {
      return vm.totalStockValue;
    }
  });
}


}
