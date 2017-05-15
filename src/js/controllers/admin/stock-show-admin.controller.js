angular
  .module('wineApp')
  .controller('StockShowCtrl', StockShowCtrl);


StockShowCtrl.$inject = ['$stateParams', 'Product'];

function StockShowCtrl($stateParams, Product) {
  const vm = this;
  vm.product = Product.get($stateParams);
}
