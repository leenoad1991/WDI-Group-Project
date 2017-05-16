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
    vm.multiplier = (vm.purchase.demo*vm.prodPurchase) * Math.pow(vm.watch.demo, vm.prodWatchByLen) * Math.pow(vm.view.demo, vm.viewsCount);
    getDifference();
    getNewLivePrice();
  }


  function getDifference() {
    vm.difference = (vm.prodPriceRetail * vm.multiplier) - vm.prodPriceRetail;
    getChange();
  }

  function getNewLivePrice() {
    vm.newLivePrice = (vm.prodPriceRetail*vm.multiplier);
  }

  //the calculation to find the amount to remove from the products
    //vm.difference/vm.profits = different minus the profit margin
    //vm.totalStockValue-productprices.retail = the total value of the inventory minus the retail
  function getChange(){
    vm.change = (vm.difference/vm.profit.demo)/(vm.totalStockValue-vm.prodPriceRetail);
    updateAllProducts();
    getDebtPercentage();
  }

//getting the debt multiplier for each update. This is applied to the original price value of all market products
//actual debt would equal..
//debt = product(n).retailPrice - (product(n).retailPrice*vm.debtPercentage);
  function getDebtPercentage() {
    vm.debtPercentage = (vm.newLivePrice-vm.prodPriceRetail)/(vm.totalStockValue-vm.prodPriceRetail);
  }

  function updateAllProducts(){
    //insert callback hook save that will update the prices of the products by the value in vm.change
    //find all products
    //update their debt to be + debt = product(n).retailPrice - (product(n).retailPrice*vm.debtPercentage);
    //save them
  }

  function updateCurrentProduct(){
    //find the product and update its live price to be reflective of the new price
  }
}

//the display price is product.price.livePrice - product.price.debt
