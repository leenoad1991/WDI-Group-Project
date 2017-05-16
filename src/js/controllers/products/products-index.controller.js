angular
.module('wineApp')
.controller('ProductsIndexCtrl', ProductsIndexCtrl);

ProductsIndexCtrl.$inject = ['Product', '$stateParams', 'CurrentUserService','filterFilter', '$scope', 'UserFactory', 'UserWatchingFactory'];
function ProductsIndexCtrl(Product, $stateParams, CurrentUserService, filterFilter, $scope, UserFactory, UserWatchingFactory){
  const vm = this;
  vm.products = [];
  vm.user = CurrentUserService.currentUser;

  vm.watchClick = watchClick;
  vm.year = '';

  function getProducts() {
    vm.all = Product.query();
  }
  getProducts();
  vm.minPriceRange = 10;
  vm.maxPriceRange = 85;

  vm.filtered = vm.products;

  function filterProduct() {
    const params = {};
    params.info = { color: vm.color };
    params.location = { country: vm.country };
    params.info = { year: vm.year };

    vm.filtered = filterFilter(vm.all, params);
    assignWatching();
  }

  filterProduct();

  $scope.$watch(() => vm.q, filterProduct);
  $scope.$watch(() => vm.type, filterProduct);
  $scope.$watch(() => vm.country, filterProduct);
  $scope.$watch(() => vm.year, filterProduct);

  productsIndex();

function assignWatching() {
  vm.currentUser = CurrentUserService.getUser();
  vm.currentUser = CurrentUserService.currentUser;
  console.log(vm.currentUser._id);
  UserWatchingFactory.get({id: vm.currentUser._id}).$promise.then(user => {
    vm.watchingUser = user;
  });
}


  function watchClick(id, $index){
    vm.currentUser = CurrentUserService.getUser();
    vm.currentUser = CurrentUserService.currentUser;
    console.log(vm.currentUser._id);
    UserWatchingFactory.get({id: vm.currentUser._id}).$promise.then(user => {
      vm.watchingUser = user;
      addWatch();
    });
function addWatch(){
  if (vm.watchingUser.watching.indexOf(id) === -1){
    console.log('Adding');
    vm.watchingUser.watching.push(id);
    UserFactory
    .update({id: vm.currentUser._id}, vm.watchingUser)
    .$promise
    .then((err) => {
      if (err) console.log(err);
    });
    vm.products[$index].watchedBy.push(vm.currentUser._id);
    // console.log(vm.products[$index].watchedBy);
    Product
    .update({ id: id}, vm.products[$index])
    .$promise
    .then((err) => {
      if (err) console.log(err);
    });
  } else {
    vm.splice = vm.watchingUser.watching.indexOf(id);
    vm.watchingUser.watching.splice(vm.splice, 1);
    UserFactory
    .update({id: vm.currentUser._id}, vm.watchingUser)
    .$promise
    .then((err) => {
      if (err) console.log(err);
    });
    vm.splice2 = vm.products[$index].watchedBy.indexOf(vm.currentUser._id);
    vm.products[$index].watchedBy.splice(vm.splice2, 1);
    Product
    .update({ id: id}, vm.products[$index])
    .$promise
    .then((err) => {
      if (err) console.log(err);
    });
    console.log('removing');
    console.log(vm.watchingUser.watching.indexOf(id));
  }
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
