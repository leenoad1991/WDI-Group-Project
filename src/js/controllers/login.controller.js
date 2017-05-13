angular
  .module('wineApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {
  const vm = this;

  vm.login = () => {
    User.login(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      console.log(CurrentUserService.currentUser, '*** current user');
      $state.go('usersIndex');
    }, err => {
      console.log(err, 'error in login controller');
    });
  };
}
