angular
  .module('wineApp')
  .controller('ProductsShowCtrl', ProductsShowCtrl);

ProductsShowCtrl.$inject = ['Product', '$stateParams'];
function ProductsShowCtrl(Product, $stateParams) {
  console.log('hitting ProductsShowCtrl');
  console.log($stateParams.id);
  const vm = this;

  vm.product = Product.get($stateParams);
  console.log(vm.product);
}
