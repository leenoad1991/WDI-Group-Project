angular
  .module('wineApp')
  .controller('ProductsShowCtrl', ProductsShowCtrl);

ProductsShowCtrl.$inject = ['Product', '$stateParams', '$state', 'CurrentUserService'];
function ProductsShowCtrl(Product, $stateParams, $state, CurrentUserService) {
  console.log('hitting ProductsShowCtrl');
  console.log($stateParams.id);
  const vm = this;
  vm.active = false;

  Product.get({id: $stateParams.id})
  .$promise
  .then(product => {
    vm.product = product;
    vm.active = true;
  });
  vm.product = Product.get($stateParams);
  console.log(vm.product);

}
