angular
.module('wineApp')
.controller('ProductsIndexCtrl', ProductsIndexCtrl);

ProductsIndexCtrl.$inject = ['Product', '$stateParams', 'CurrentUserService','filterFilter', '$scope', 'UserFactory'];
function ProductsIndexCtrl(Product, $stateParams, CurrentUserService, filterFilter, $scope, UserFactory){
  const vm = this;
  vm.products = [];
  vm.user = CurrentUserService.currentUser;

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

  function watchClick(id, $index){
    vm.currentUser = CurrentUserService.getUser();
    vm.currentUser = CurrentUserService.currentUser;
    if (vm.currentUser.watching.indexOf(id) === -1){
      vm.currentUser.watching.push(id);
      UserFactory
      .update({id: vm.currentUser._id}, vm.currentUser)
      .$promise
      .then((err) => {
        if (err) console.log(err);
      });
      vm.products[$index].watchedBy.push(vm.currentUser._id);
      console.log(vm.products[$index].watchedBy);
      Product
      .update({ id: id}, vm.products[$index])
      .$promise
      .then((err) => {
        if (err) console.log(err);
      });
    }



    // console.log(id);
    // console.log(user.currentUser._id);
    // console.log(Product.get({ id }));
  }



  function productsIndex() {
    vm.products = Product.query();
    console.log('running productsIndexCtrl', vm.products);
  }
}
