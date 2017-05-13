angular
  .module('wineApp')
  .controller('UserRegisterCtrl', userRegisterCtrl);

userRegisterCtrl.$inject = ['UserFactory', 'CurrentUserService', '$state'];
function userRegisterCtrl(UserFactory, CurrentUserService, $state) {
  const vm = this;
  vm.register = () => {
    UserFactory
    .register(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      $state.go('login');
    }, (err) => {
      console.log(err, '***REGISTER.CONTROLLER');
    });
  };
}
