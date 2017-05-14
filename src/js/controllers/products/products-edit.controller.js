angular
  .module('wineApp')
  .controller('ProductsEditCtrl', ProductsEditCtrl);

ProductsEditCtrl.$inject = ['API', '$http', '$state', '$stateParams', '$resource'];
function ProductsEditCtrl(API, $http, $state, $stateParams, $resource) {
  const vm = this;
  const Product = $resource(`${API}/wines/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }

  });

  vm.product = Product.get($stateParams);
  vm.update = productsUpdate;

  function productsUpdate() {
    console.log('hitting productsUpdate on the client side');
    Product
      .update({ id: $stateParams.id }, vm.product)
      .$promise
      .then(() => {
        // vm.product = {};
        $state.go('productsIndex');
        console.log(vm.product);
      })
      .catch(err => console.log(err));
  }

}
