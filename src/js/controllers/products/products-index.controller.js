angular
.module('wineApp')
.controller('ProductsIndexCtrl', ProductsIndexCtrl);

ProductsIndexCtrl.$inject = ['Product', '$stateParams', 'CurrentUserService'];
function ProductsIndexCtrl(Product, $stateParams, CurrentUserService){
  const vm = this;
  vm.products = [];
  const user = CurrentUserService;

  vm.watchClick = watchClick;

  productsIndex();

  function watchClick(id){
    console.log(id);
    console.log(user.currentUser._id);
  }



  function productsIndex() {
    vm.products = Product.query();
    console.log('running productsIndexCtrl', vm.products);
  }
}
