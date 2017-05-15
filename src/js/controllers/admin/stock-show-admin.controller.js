angular
  .module('wineApp')
  .controller('StockShowCtrl', StockShowCtrl);


StockShowCtrl.$inject = ['$stateParams', 'Product', '$state'];

function StockShowCtrl($stateParams, Product, $state) {
  const vm = this;
  vm.product = Product.get($stateParams);
  vm.delete = deleteProduct;
  
  function deleteProduct(product) {
    console.log('deleting');
    Product
    .remove({id: product._id})
    .$promise
    .then(()=> {
      $state.go('account.stock');
    });
  }
}
