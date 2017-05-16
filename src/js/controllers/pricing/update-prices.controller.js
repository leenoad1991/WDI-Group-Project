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

  vm.prodPurch = //product.totalStock - product.currentStock;
  vm.prodWatchByLen = //product.watchedby.length;
  vm.viewsCount = //product.views.count;

  //the calculation to find the amount to remove from the products
    //vm.difference/vm.profits = different minus the profit margin
    //vm.totalStockValue-productprices.retail = the total value of the inventory minus the retail
  vm.change = (vm.difference/vm.profit)/(vm.totalStockValue-product.prices.retail);
  //This calculates the product price difference and is used to determine the change value that is applied to the rest of the products
  vm.difference = //(product.prices.livePrice * vm.multiplier) - product.prices.retail
  vm.multiplier = (vm.purchase.demo*vm.prodPurch) * Math.pow(vm.watch.demo, vm.prodWatchByLen) * Math.pow(vm.view.demo, vm.viewsCount);

}
