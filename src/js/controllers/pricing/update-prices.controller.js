angular
  .module('wineApp')
  .controller('UpdatePricesCtrl', UpdatePricesCtrl);

UpdatePricesCtrl.$inject = ['PricesFactory', 'TotalValueService', 'Product'];
function UpdatePricesCtrl(PricesFactory, TotalValueService, Product) {
  const vm = this;
  TotalValueService.getTotalValue();
  vm.findPrices = findPrices;
  findPrices();
  //multiplier
  function findPrices(){
    console.log('firing');
    PricesFactory.query().$promise.then(data => {
      vm.purchase   = data[0].purchase;
      vm.watch      = data[0].watch;
      vm.view       = data[0].view;
      vm.profit     = data[0].profit;
      console.log(vm.purchase, vm.watch, vm.view, vm.profit);
      getTotalValue();
      // findProduct();
      getMultiplier();
    });

  }
//   //returns a value from the service that should be assigned to totalStock value
  function getTotalValue(){
    setTimeout(function () {
      vm.totalStockValue = TotalValueService.totalStockValue;
      console.log('TotalValueService = £', vm.totalStockValue);
    }, 10);
  }
//
//   //finds the information about the product so we can update it
//   function findProduct(){
//     Product.find({id: vm.productId}).$promise.then(product => {
//       vm.prodPurchase     = product.totalStock - product.currentStock;
//       vm.prodWatchByLen   = product.watchedby.length; //return 1 if 0
//       vm.prodViewsCount   = product.views.count;
//       vm.prodPriceLive    = product.prices.livePrice;
//       vm.prodPriceRetail  = product.prices.retail;
//       getMultiplier();
//     });
//   }

      vm.prodPurchase     = 1;
      vm.prodWatchByLen   = 1; //return 1 if 0
      vm.prodViewsCount   = 1;
      vm.prodPriceLive    = 10;
      vm.prodPriceRetail  = 10;
//   //This calculates the product price difference and is used to determine the change value that is applied to the rest of the products
  function getMultiplier(){
    vm.multiplier = (vm.purchase.demo*vm.prodPurchase) * Math.pow(vm.watch.demo, vm.prodWatchByLen) * Math.pow(vm.view.demo, vm.prodViewsCount);
    console.log('multiplier 1 - ', (vm.purchase.demo*vm.prodPurchase), ' <(vm.purchase.demo*vm.prodPurchase)');
    console.log('multiplier 2 - ', Math.pow(vm.watch.demo, vm.prodWatchByLen), ' <Math.pow(vm.watch.demo, vm.prodWatchByLen)');
    console.log('multiplier 3 - ', Math.pow(vm.view.demo, vm.prodViewsCount), ' <Math.pow(vm.view.demo, vm.viewsCount)');
    console.log('Total Multiplier', vm.multiplier);
    setTimeout(function () {
      getNewLivePrice();
      getDifference();
    }, 15);
  }
//
//
  function getDifference() {
    vm.difference = (vm.prodPriceRetail * vm.multiplier) - vm.prodPriceRetail;
    console.log('PRODUCT DIFFERENCE = ', vm.difference);
    // getChange();
    getDebtPercentage();
  }
//
  function getNewLivePrice() {
    vm.newLivePrice = (vm.prodPriceRetail*vm.multiplier);
    console.log('PRODUCT RETAIL PRICE = ', vm.prodPriceRetail);
    console.log('NEW PRODUCT LIVE PRICE  = ', vm.newLivePrice);
  }
//
//   //the calculation to find the amount to remove from the products
//     //vm.difference/vm.profits = different minus the profit margin
//     //vm.totalStockValue-productprices.retail = the total value of the inventory minus the retail
//   function getChange(){
//     vm.change = (vm.difference/vm.profit.demo)/(vm.totalStockValue-vm.prodPriceRetail);
//     updateAllProducts();
//     getDebtPercentage();
//   }
//
// //getting the debt multiplier for each update. This is applied to the original price value of all market products
// //actual debt would equal..
// //debt = product(n).retailPrice - (product(n).retailPrice*vm.debtPercentage);
  function getDebtPercentage() {
    // vm.debtPercentage = (vm.newLivePrice-vm.prodPriceRetail)/(vm.totalStockValue-vm.prodPriceRetail)*100;
    vm.debtPercentage = (vm.newLivePrice-vm.prodPriceRetail)/(80-vm.prodPriceRetail);
    vm.remainingTSV = 80-vm.prodPriceRetail;
    console.log('DEBT PERCENTAGE / RATIO = ', vm.debtPercentage);
    vm.p2 = 10;
    vm.p3 = 20;
    vm.p4 = 15;
    vm.p5 = 25;
    console.log('OTHER PRODUCT PRICE #2 - £', vm.p2);
    console.log('OTHER PRODUCT PRICE #3 - £', vm.p3);
    console.log('OTHER PRODUCT PRICE #4 - £', vm.p4);
    console.log('OTHER PRODUCT PRICE #5 - £', vm.p5);
    // vm.p2 = (vm.p2/vm.remainingTSV);
    // vm.p3 = (vm.p3/vm.remainingTSV);
    // vm.p4 = (vm.p4/vm.remainingTSV);
    // vm.p5 = (vm.p5/vm.remainingTSV);
    vm.p2 = (vm.p2*vm.debtPercentage);
    vm.p3 = (vm.p3*vm.debtPercentage);
    vm.p4 = (vm.p4*vm.debtPercentage);
    vm.p5 = (vm.p5*vm.debtPercentage);
    // console.log('OTHER PRODUCT DEBT RATIO #2 - £', vm.p2);
    // console.log('OTHER PRODUCT DEBT RATIO #3 - £', vm.p3);
    // console.log('OTHER PRODUCT DEBT RATIO #4 - £', vm.p4);
    // console.log('OTHER PRODUCT DEBT RATIO #5 - £', vm.p5);
    // vm.p2 =  vm.p2 * vm.prodPriceRetail;
    // vm.p3 =  vm.p3 * vm.prodPriceRetail;
    // vm.p4 =  vm.p4 * vm.prodPriceRetail;
    // vm.p5 =  vm.p5 * vm.prodPriceRetail;
    console.log('OTHER PRODUCT PRICE POST MULTIPLIER #2 - £', vm.p2);
    console.log('OTHER PRODUCT PRICE POST MULTIPLIER #3 - £', vm.p3);
    console.log('OTHER PRODUCT PRICE POST MULTIPLIER #4 - £', vm.p4);
    console.log('OTHER PRODUCT PRICE POST MULTIPLIER #5 - £', vm.p5);
    vm.td = 10*vm.debtPercentage + 20*vm.debtPercentage + 15*vm.debtPercentage + 25 *vm.debtPercentage
    // vm.td = vm.p2 + vm.p3 + vm.p4 + vm.p5;
    console.log('TOTAL DEBT TAKEN FROM ALL PRODUCTS - £', vm.td );
  }
//
//   function updateAllProducts(){
//     //insert callback hook save that will update the prices of the products by the value in vm.change
//     //find all products
//     //update their debt to be + debt = product(n).retailPrice - (product(n).retailPrice*vm.debtPercentage);
//     //save them
//   }
//
//   function updateCurrentProduct(){
//     //find the product and update its live price to be reflective of the new price
//   }
}

//the display price is product.price.livePrice - product.price.debt
