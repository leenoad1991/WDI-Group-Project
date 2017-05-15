angular
.module('wineApp')
.controller('ProductsIndexCtrl', ProductsIndexCtrl);

ProductsIndexCtrl.$inject = ['Product', '$stateParams', 'CurrentUserService','filterFilter', '$scope'];
function ProductsIndexCtrl(Product, $stateParams, CurrentUserService, filterFilter, $scope){
  const vm = this;
  vm.products = [];
  const user = CurrentUserService;

  vm.watchClick = watchClick;

  vm.all = Product.query();
  vm.minPriceRange = 10;
  vm.maxPriceRange = 85;

  vm.filtered = vm.products;

  function filterProduct() {
    const params = { name: vm.q };
    params.info = { type: vm.type };
    // params.price = { retail: vm.maxPriceRange };
    params.info = { year: vm.year };
    // console.log(params.price.retail);
    vm.filtered = filterFilter(vm.all, params);
  }

  filterProduct();

  $scope.$watch(() => vm.q, filterProduct);
  $scope.$watch(() => vm.type, filterProduct);
  // $scope.$watch(() => vm.maxPriceRange, filterProduct);
  $scope.$watch(() => vm.year, filterProduct);

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


//drop down type.
//location search
