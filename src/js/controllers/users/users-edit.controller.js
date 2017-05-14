angular
  .module('wineApp')
  .controller('UserEditCtrl', UserEditCtrl);

UserEditCtrl.$inject = ['UserFactory', 'CurrentUserService', '$state'];

function UserEditCtrl(UserFactory, CurrentUserService, $state) {
  const vm = this;
  console.log(CurrentUserService.currentUser, 'user');
  vm.currentUser = CurrentUserService.currentUser;
  vm.user = UserFactory.get( {id: vm.currentUser._id} );
  vm.update   = userUpdate;

  function userUpdate() {
    console.log(vm.user.firstName);
    UserFactory
      .update({ id: vm.currentUser._id },
      vm.user)
      .$promise
      .then(() => {
        $state.go('account.watchlist');
      });
  }
}
