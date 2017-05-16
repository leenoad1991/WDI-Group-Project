angular
  .module('wineApp')
  .controller('UpdatePricesCtrl', UpdatePricesCtrl);

UpdatePricesCtrl.$inject = ['PricesFactory'];
function UpdatePricesCtrl(PricesFactory) {
  const vm = this;
  PricesFactory.query().$promise.then(data => {
    vm.purchase = data[0].purchase;
    vm.watch = data[0].watch;
    vm.view = data[0].view;
    console.log(vm.purchase, vm.watch, vm.view);
  });
}
