angular
  .module('wineApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['UserFactory', '$state'];
function UsersIndexCtrl(UserFactory, $state) {
  const vm = this;
  UserFactory.query()
  .$promise
  .then(users => {
    vm.users = users;
  }).catch(err => console.log(err, 'error in user index controller'));
  vm.loggedIn = true;
  vm.update = userUpdate;

  function userUpdate($index) {
    console.log('update firing');
    console.log(vm.users[$index]);
    UserFactory
      .update({ id: vm.users[$index]._id },
      vm.users[$index])
      .$promise
      .then(() => {
        $state.go('account.users');
        console.log('users updated');
      });
  }
}
