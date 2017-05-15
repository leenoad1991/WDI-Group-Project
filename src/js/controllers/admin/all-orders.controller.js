angular
.module('wineApp')
.controller('AllOrdersCtrl', AllOrdersCtrl);

AllOrdersCtrl.$inject = ['UserFactory'];

function AllOrdersCtrl(UserFactory) {
  const vm = this;
  vm.currentOrders = [];
  UserFactory
  .query()
  .$promise
  .then(users => {
    users.forEach(user => {
      if (user.orders.current.length > 0) {
        user.orders.current.forEach(order => {
          vm.currentOrders.push(order);
        });
      }
    });
  });
}
