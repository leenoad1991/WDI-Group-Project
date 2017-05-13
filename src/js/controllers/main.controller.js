angular
  .module('wineApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state'];

function MainCtrl($rootScope, CurrentUserService, $state) {
  const vm = this;
  $rootScope.$on('LoggedIn', () => {
    vm.userFactory = CurrentUserService.currentUser;
  });
  vm.logout = () => {
    CurrentUserService.removeUser();
  };
  $rootScope.$on('LoggedOut', () => {
    console.log('Logged Out');
    vm.userFactory = null;
    $state.go('login');
  });
}
