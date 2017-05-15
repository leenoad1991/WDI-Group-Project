angular
.module('wineApp')
.controller('UsersWatchlistCtrl', UsersWatchlistCtrl);

UsersWatchlistCtrl.$inject = ['UserFactory', 'Product', 'CurrentUserService'];
function UsersWatchlistCtrl(UserFactory, Product, CurrentUserService) {
  const vm = this;
  vm.currentUser = CurrentUserService.currentUser;
  UserFactory
    .get({ id: vm.currentUser._id })
    .$promise
    .then(user => {
      vm.user = user;
      console.log(vm.user);
    });
}
