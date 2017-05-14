angular
  .module('wineApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['UserFactory'];
function UsersIndexCtrl(UserFactory) {
  const vm = this;
  UserFactory.query()
  .$promise
  .then(users => {
    vm.users = users;
  }).catch(err => console.log(err, 'error in user index controller'));
  vm.loggedIn = true;
}
