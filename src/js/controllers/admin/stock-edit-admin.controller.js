angular
  .module('wineApp')
  .controller('StockEditCtrl', StockEditCtrl);

StockEditCtrl.$inject = ['$location', '$stateParams', '$resource', 'Product'];
function StockEditCtrl($location, $stateParams, $resource, Product) {
  const vm = this;
  // const Product = $resource(`${API}/wines/:id`, { id: '@_id'}, {
  //   'update': { method: 'PUT' }
  // });

  vm.product = Product.get({ id: $stateParams.id });
  vm.update = productsUpdate;

  function productsUpdate() {
    console.log('hitting productsUpdate on the client side');
    Product
      .update({ id: $stateParams.id }, vm.product)
      .$promise
      .then(product => {
        // vm.product = {};
        $location.path(`/account/admin/stock/all/${product._id}`);
        console.log(vm.product);
      })
      .catch(err => console.log(err));
  }

}
