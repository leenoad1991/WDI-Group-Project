angular
  .module('wineApp')
  .controller('StockAddCtrl', StockAddCtrl);

StockAddCtrl.$injection = ['Product', '$location'];
function StockAddCtrl(Product, $location) {
  const vm = this;

  vm.create = productsCreate;
  function productsCreate() {
    Product
      .create(vm.product)
      .$promise
      .then(product => {
        // vm.product = {};
        $location.path(`/account/admin/stock/all/${product._id}`);
        console.log(vm.product);
      })
      .catch(err => console.log(err));
  }
}
