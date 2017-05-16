angular
  .module('wineApp')
  .controller('UpdatePricesCtrl', UpdatePricesCtrl);

UpdatePricesCtrl.$inject = ['PricesFactory', 'TotalValueService', 'Product'];
function UpdatePricesCtrl(PricesFactory, TotalValueService, Product) {
  const vm = this;
  vm.findPrices = findPrices;
  function findPrices(){
    PricesFactory.query().$promise.then(data => {
      vm.purchase   = data[0].purchase;
      vm.watch      = data[0].watch;
      vm.view       = data[0].view;
      vm.profit     = data[0].profit;
      console.log(vm.purchase, vm.watch, vm.view);
      getTotalValue();
      findProduct();
    });
  }
  //returns a value from the service that should be assigned to totalStock value
  function getTotalValue(){
    vm.totalStockValue = TotalValueService.getTotalValue();
  }
  //finds the information about the product so we can update it
  function findProduct(){
    Product.find({id: vm.productId}).$promise.then(product => {
      vm.prodPurchase     = product.totalStock - product.currentStock;
      vm.prodWatchByLen   = product.watchedby.length; //return 1 if 0
      vm.prodViewsCount   = product.views.count;
      vm.prodPriceLive    = product.prices.livePrice;
      vm.prodPriceRetail  = product.prices.retail;
      getMultiplier();
    });
  }
  //This calculates the product price difference and is used to determine the change value that is applied to the rest of the products
  function getMultiplier(){
    vm.multiplier = (vm.purchase.demo*vm.prodPurch) * Math.pow(vm.watch.demo, vm.prodWatchByLen) * Math.pow(vm.view.demo, vm.viewsCount);
    getDifference();
  }

  function getDifference() {
    vm.difference = (vm.prodPriceLive * vm.multiplier) - vm.prodPriceRetail;
    getChange();
  }
  //the calculation to find the amount to remove from the products
    //vm.difference/vm.profits = different minus the profit margin
    //vm.totalStockValue-productprices.retail = the total value of the inventory minus the retail
  function getChange(){
    vm.change = (vm.difference/vm.profit.demo)/(vm.totalStockValue-vm.prodPriceRetail);
  }
}
