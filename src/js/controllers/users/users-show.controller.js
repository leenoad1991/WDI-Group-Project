angular
.module('wineApp')
.controller('UsersShowCtrl', UsersShowCtrl);


UsersShowCtrl.$inject = ['$stateParams', 'UserFactory'];

function UsersShowCtrl($stateParams, UserFactory) {
  const vm = this;
  vm.user = UserFactory.get($stateParams);
  console.log(vm.user, 'hit users show');
}
