angular
.module('wineApp')
.controller('UpdatePricesCtrl', UpdatePricesCtrl);

UpdatePricesCtrl.$inject = ['PricesFactory', 'TotalValueService', 'Product'];
function UpdatePricesCtrl(PricesFactory, TotalValueService, Product) {
  const vm = this;
  TotalValueService.getTotalValue();
  // vm.findPrices = findPrices;
  vm.findProduct = findPrices;
  Product.query().$promise.then(products => {
    vm.products = products;
    getMarketValue();
  });

  function findPrices(productId, $index){
    console.log('firing');
    PricesFactory.query().$promise.then(data => {
      vm.purchase   = data[0].purchase;
      vm.watch      = data[0].watch;
      vm.view       = data[0].view;
      vm.profit     = data[0].profit;
      console.log(vm.purchase, vm.watch, vm.view, vm.profit);
      getTotalValue();
      findProduct(productId, $index);
      getMarketLiveValue();
      console.log(productId);
      vm.time = new Date();
      vm.time = vm.time.getTime();
    });
  }

  vm.getMarketLiveValue = getMarketLiveValue;


  function getMarketValue() {
    vm.marketPrice = 0;
    vm.products.forEach(product => {
      vm.marketPrice = vm.marketPrice + product.price.retail;
    });
  }
  function getMarketLiveValue() {
    vm.marketLivePrice = 0;
    vm.products.forEach(product => {
      vm.marketLivePrice = vm.marketLivePrice + product.price.livePrice;
    });
  }

  function getTotalValue(){
    setTimeout(function () {
      vm.totalStockValue = TotalValueService.totalStockValue;
      console.log('TotalValueService = £', vm.totalStockValue);
    }, 10);
  }

  function findProduct(productId, $index){
    Product.get({id: productId}).$promise.then(product => {
      vm.prodPurchase     = (product.stock.original - product.stock.current) + 1;
      vm.prodWatchByLen   = product.watchedBy.length + 1; //return 1 if 0
      vm.prodViewsCount   = product.views.count + 1;
      vm.prodPriceLive    = product.price.livePrice;
      vm.prodPriceRetail  = product.price.retail;
      vm.product          = product;
      getMultiplier(productId, $index);
      console.log(product, 'findProductWorking');
    });
  }

  function getMultiplier(productId, $index){
    vm.multiplier = (vm.purchase.demo*vm.prodPurchase) * Math.pow(vm.watch.demo, vm.prodWatchByLen) * Math.pow(vm.view.demo, vm.prodViewsCount);
    console.log('multiplier 1 - ', (vm.purchase.demo*vm.prodPurchase), ' <(vm.purchase.demo*vm.prodPurchase)');
    console.log('multiplier 2 - ', Math.pow(vm.watch.demo, vm.prodWatchByLen), ' <Math.pow(vm.watch.demo, vm.prodWatchByLen)');
    console.log('multiplier 3 - ', Math.pow(vm.view.demo, vm.prodViewsCount), ' <Math.pow(vm.view.demo, vm.viewsCount)');
    console.log('Total Multiplier', vm.multiplier);
    setTimeout(function () {
      getNewLivePrice();
      getDifference(productId, $index);
    }, 15);
  }

  function getDifference(productId, $index) {
    vm.difference = (vm.prodPriceRetail * vm.multiplier) - vm.prodPriceRetail;
    console.log('PRODUCT DIFFERENCE = ', vm.difference);
    getDebtPercentage(productId, $index);
  }
  //
  function getNewLivePrice() {
    vm.newLivePrice = (vm.prodPriceLive*vm.multiplier);
    console.log('PRODUCT RETAIL PRICE = ', vm.prodPriceRetail);
    console.log('NEW PRODUCT LIVE PRICE  = ', vm.newLivePrice);
  }

  function getDebtPercentage(productId, $index) {
    vm.debtPercentage = (vm.newLivePrice-vm.prodPriceRetail)/(vm.totalStockValue-vm.prodPriceRetail);
    vm.remainingTSV = vm.totalStockValue-vm.prodPriceRetail;
    console.log('DEBT PERCENTAGE / RATIO = ', vm.debtPercentage);
    updateAllProducts(productId, $index);
  }
  function updateAllProducts(productId, $index){
    vm.product.price.livePrice = vm.newLivePrice;
    vm.updateCount = 0;
    if ( Math.floor((new Date() - 60000*60) > vm.product.views.lastTime)) {
      console.log('GRAPHS UPDATING');
      vm.product.views.lastTime = Math.floor(new Date());
      vm.product.price.livePriceDisplay.push(vm.product.price.livePrice);
      vm.product.price.liveTime.push(new Date().getHours());
    }
    Product.update({ id: vm.product._id}, vm.product).$promise.then(() => {
      // console.log(vm.product, 'Product Updated');
    }).catch(err => console.log(err));
    vm.products.forEach(product => {
      vm.updateCount ++;
      if (product._id !== productId) {
        vm.updateCount ++;
        product.price.livePrice = product.price.livePrice-(product.price.livePrice*vm.debtPercentage);
        console.log(product.name, product.price.livePrice);
        // if ( Math.floor((new Date() - 60000*60) > vm.product.views.lastTime)) {
        console.log('GRAPHS UPDATING', product);
        product.views.lastTime = vm.time;
        product.price.livePriceDisplay.push(Math.floor(vm.product.price.livePrice));
        product.price.liveTime.push(new Date().getHours());
        // }
        Product.update({ id: product._id}, product).$promise.then(() => {
          console.log('Product Updated');
        }).catch(err => console.log(err));
      }
      if (vm.updateCount === vm.products.length-1) {
        getMarketLiveValue();
      }
    });
  }

  //first display all seed data on page
  //then add button that applies the multiplier when clicked
  //then run the alogirithm



  //   function updateCurrentProduct(){
  //     //find the product and update its live price to be reflective of the new price
  //   }
}

//the display price is product.price.livePrice - product.price.debt
