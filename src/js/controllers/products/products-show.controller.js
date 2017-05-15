angular
  .module('wineApp')
  .controller('ProductsShowCtrl', ProductsShowCtrl);

ProductsShowCtrl.$inject = ['Product', '$stateParams', '$state', 'CurrentUserService'];
function ProductsShowCtrl(Product, $stateParams, $state, CurrentUserService) {
  console.log('hitting ProductsShowCtrl');
  console.log($stateParams.id);
  const vm = this;

  vm.product = Product.get($stateParams);
  console.log(vm.product);

  vm.delete = productsDelete;
  

  function productsDelete(){
    console.log('deleting');
    console.log($stateParams.id);

    Product
    .remove({ id: $stateParams.id })
    .$promise
    .then(() => {
      $state.go('productsIndex');
    });
  }
}
