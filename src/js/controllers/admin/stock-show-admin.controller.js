angular
  .module('wineApp')
  .controller('StockShowCtrl', StockShowCtrl);


StockShowCtrl.$inject = ['$stateParams', 'Product', '$state'];

function StockShowCtrl($stateParams, Product, $state) {
  const vm = this;
  Product.get({id: $stateParams.id})
  .$promise
  .then(product => {
    console.log(product);
    product.views.time = product.views.time.slice(Math.max(product.views.time.length - 12, 1));
    product.views.number = product.views.number.slice(Math.max(product.views.number.length - 12, 1));
    product.price.liveTime = product.price.liveTime.slice(Math.max(product.price.liveTime.length - 12, 1));
    product.price.livePriceDisplay = product.price.livePriceDisplay.slice(Math.max(product.price.livePriceDisplay.length - 12, 1));
    vm.product = product;
  });
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
