angular
.module('wineApp')
.controller('UserOrdersCtrl', UserOrdersCtrl);

UserOrdersCtrl.$inject = ['UserFactory', 'CurrentUserService'];

function UserOrdersCtrl(UserFactory, CurrentUserService) {
  const vm = this;
  vm.currentUser = CurrentUserService.currentUser;

  UserFactory
    .get({ id: vm.currentUser._id })
    .$promise
    .then(user => {
      vm.user = user;
    });
}
