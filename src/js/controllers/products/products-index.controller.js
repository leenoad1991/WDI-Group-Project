angular
.module('wineApp')
.controller('ProductsIndexCtrl', ProductsIndexCtrl);

ProductsIndexCtrl.$inject = ['Product'];
function ProductsIndexCtrl(Product){
  const vm = this;
  vm.products = [];

  productsIndex();

  function productsIndex() {
    vm.products = Product.query();
    console.log('running productsIndexCtrl', vm.products);
  }
}
