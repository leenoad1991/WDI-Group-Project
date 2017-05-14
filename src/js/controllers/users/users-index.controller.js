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
  vm.show = showUser;

  function showUser(userId) {
    UserFactory
      .get({ id: userId })
      .$promise
      .then(() => {
        $state.go('account.user');
        console.log('Showing User');
      });
  }
}
