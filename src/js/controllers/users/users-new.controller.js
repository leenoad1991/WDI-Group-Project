angular
.module('wineApp')
.controller('UserNewController', UserNewController);

UserNewController.$inject = ['UserFactory', 'CurrentUserService', '$state'];
function UserNewController(UserFactory, CurrentUserService, $state) {
  const vm = this;
  vm.register = () => {
    UserFactory
    .register(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      $state.go('login');
    }, (err) => {
      console.log(err, 'error in reg controller');
    });
  };
}
