angular
  .module('wineApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['UserFactory', 'CurrentUserService', '$state'];
function LoginCtrl(UserFactory, CurrentUserService, $state) {
  const vm = this;

  vm.login = () => {
    UserFactory.login(vm.user)
    .$promise
    .then(() => {
      console.log('GOT HERE');
      CurrentUserService.getUser();
      console.log(CurrentUserService.currentUser, '*** current user');
      $state.go('productsIndex');
    }, err => {
      console.log(err, 'error in login controller');
    });
  };
}
