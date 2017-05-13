angular
  .module('wineApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state'];

function MainCtrl($rootScope, CurrentUserService, $state) {
  const vm = this;
  $rootScope.$on('LoggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });
  vm.logout = () => {
    CurrentUserService.removeUser();
    console.log('logging out');
  };
  $rootScope.$on('LoggedOut', () => {
    console.log('Logged Out');
    vm.user = null;
    $state.go('login');
  });
}
