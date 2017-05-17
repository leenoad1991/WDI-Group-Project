angular
.module('wineApp')
.controller('ProductsIndexCtrl', ProductsIndexCtrl);

ProductsIndexCtrl.$inject = ['Product', '$stateParams', 'CurrentUserService','filterFilter', '$scope', 'UserFactory', 'UserWatchingFactory'];
function ProductsIndexCtrl(Product, $stateParams, CurrentUserService, filterFilter, $scope, UserFactory, UserWatchingFactory){
  const vm         = this;
  vm.products      = [];
  vm.user          = CurrentUserService.currentUser;
  vm.watchClick    = watchClick;
  vm.year          = '';
  vm.min           = 0;
  vm.max           = 100000;

  Product
  .query()
  .$promise
  .then(products => {
    vm.all = products;
    console.log(vm.all);
    filterProducts();
  });

  function filterProducts() {
    if (vm.country === 'All') vm.country = '';
    if (vm.color === 'All') vm.color = '';

    const params = {};
    params.name = vm.search;
    params.location = { country: vm.country };
    params.info = {
      color: vm.color,
      year: vm.year
    };
    params.price = { livePrice: vm.minPriceRange };

    vm.filtered = filterFilter(vm.all, params);
    vm.filteredPrice = vm.filtered.filter(item => {
      return item.price.livePrice <= vm.max && item.price.livePrice >= vm.min;
    });
    assignWatching();

  }


  $scope.$watchGroup([
    () => vm.q,
    () => vm.color,
    () => vm.country,
    () => vm.year,
    () => vm.search,
    () => vm.max,
    () => vm.min
  ], filterProducts);


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
        vm.filtered[$index].watchedBy.push(vm.currentUser._id);
        // console.log(vm.products[$index].watchedBy);
        Product
        .update({ id: id}, vm.filtered[$index])
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
        vm.splice2 = vm.filtered[$index].watchedBy.indexOf(vm.currentUser._id);
        vm.filtered[$index].watchedBy.splice(vm.splice2, 1);
        Product
        .update({ id: id}, vm.filtered[$index])
        .$promise
        .then((err) => {
          if (err) console.log(err);
        });
        console.log('removing');
        console.log(vm.watchingUser.watching.indexOf(id));
      }
    }
  }
}
