
WDI - Group Project

---


# -- Market-X --

# Introduction
Market-X is the first online market place for goods that behave like a true commodities market. By taking user actions we can affect the price of goods across the whole  system. 

We designed Market-X to be a zero-sum game. If one price goes up the others are effected and reduced to accomidate for this increase invalue. What this has allowed us to do is create a system where we can simply emter how much profit we want to make from our total stock and that amount of profit is guranteed. 
## Concept
#### Idea Development
We developed this idea over the Friday afternoon on the first day of the project. Instead of having an idea and figuring out what we wanted to achieve with that idea, we instead shifted to aligning all our goals, figuring out targets and then making a product fit those goals. Thus Market-X was born. 

Market-X fits the spec of the assignment and goes above and beyond what we learned. It was a challenge that we felt comfortable reaching for and one that we undertook gladly. 

##### Our Initial Goals
<!--![planning-group-project-2](https://cloud.githubusercontent.com/assets/25775232/26201999/a8033ef6-3bcd-11e7-84a6-60328f8b0a2e.JPG)-->
<em> The room where we started planning </em>

Our initial goals for the project where to make a store where the value of the products could change and be update live. They would be effected by user interaction. Effectively making a stock market but for an online store.

The goals we were set are as follows: 

* Node.JS Express API
* Authenticated App
* Users
* CRUD MongoDB
* Angular Front End

The goals we set for ourselves were - 

* Multiple end points
* Authentication redirection 
* Live Price updating
* Watching functionality
* Refferenced Models


#### Planning
<img width="1280" alt="trello-mastery" src="https://cloud.githubusercontent.com/assets/25775232/26202140/31b2464c-3bce-11e7-8bbf-e49e13433571.png"

To say that we were maticulous in our planning would be an understatement. We went above and beyond to make sure that every stage of product and development was accounted for and planned. 

We set up timetables, gave ourselves deadlines and worked to schedules. This finite control allowed us to complete an MVP of the given assigned spec within 24 hours and achieve <strong> full MVP </strong> (what we hoped to acheive, barebones shippable product) by Wednesday of the following week. 

Trello was a useful resource that we added to and updated as we went along. We ended up with a large amount of completed functionality is a great feeling.

Further down in the Stages section we outline further our goals for each stage. 

<img width="1280" alt="screen shot 2017-05-18 at 14 22 58" src="https://cloud.githubusercontent.com/assets/25775232/26204073/8ff69760-3bd5-11e7-8b12-9a0735355744.png"



#### Git
<!--<img width="268" alt="git-mastery" src="https://cloud.githubusercontent.com/assets/25775232/26202097/02e7ffb4-3bce-11e7-8bfd-b843fb760175.png">-->

<em> We distributed a simple example of the steps of using Git so that we all knew what to do </em>

One of the biggest challenges that we knew we were going to face was working effectively as a colloborative team. Using Github to push and pull different builds. Making sure that we had minimal conflicts with merges and that no one lost the work they had been engaging on. 

To achieve this we spent 30 mins practising typical tasks on the Friday before we had even started coding. Further we started to plan around the git merges making sure that we would push and pull when everyone was in agreement and doing so in a logical manner. I.e. the largest changes were merged first and then the smaller changes were implemented in a waterfall style.

We also made it a priority to announce what files you were working in and when. If you were working in a file that someone else was then we would discuss the changes before commiting and pushing the merges. 

<strong> Key Takeaways </strong>

* Plan your product development
* Branch off immediately upon pulling the latest version
* Waterfall the merge process
* Don't work on the same files as your team mates
* Complete features before moving on to the next one

#### Designing
<!--![colors](https://cloud.githubusercontent.com/assets/25775232/26203296/99192950-3bd2-11e7-89f0-288748f61126.png)
-->
<br> 
<em> Very early on we decided on a colour scheme that we wanted to adhere to. Simple tonal reds that would pervay the site </em>
<br>

<!--![wine-index](https://cloud.githubusercontent.com/assets/25775232/26203307/a12dfd46-3bd2-11e7-97d5-4370f17c7f79.png)
-->
<br>
<em> The index page for products was going to be the main content of the page and thus we decided to do an advanced wireframe for it.</em>
<br>

<!--![wine-show](https://cloud.githubusercontent.com/assets/25775232/26203299/9cf2d922-3bd2-11e7-9f10-922759aa2792.png)-->

<br>
<em> The show page for products was going to be another main page for content thus we decided to do an advanced wireframe for it as well.</em>
<br>

These designs were particularly useful because they allowed everyone to work towards the same goal and we had little issues with clashes over what we thought the website should look like. 

They also allowed us to better visualise how we wanted the final product to look and to act. 


## Walkthrough
Our intention with this product was to create a market place where business could upload products and sell them with a guranteed margin.

We could either whitelabel the product or we host it ourselves. The functionality is described below. 
### Basic User
A normal user who does not have any admin privaleges can register to the site, and login. 

There they can browse the products that are available and add items to their watch list. They can view more information about products.

<em> It was our original intention to allow users to actually buy products and add them to a basket by implementing stripe. However, we ran our of time. It is definitely something we would consider in the future. </em>

#### Reactionary Prices

The core function of the website is that the prices of products react to user interaction. If users view products or add them to their watch lists for example then we update prices to reflect this. The more popular a porduct the more expensive it is. 

We have created an algorithm that takes into account the weightings of actions, the weightings of the product in the total market and adjusts accorgingly. 

How we achieved this is explained below.

#### Buy Now

The buy now function is the event we have used to trigger the price increase. This takes into account all the other factors that have been accumilating and sends them to the algorithm in order to determin its new price. 

### Admin User

We set up a backend management system that would allow approved users to over see the stock of the system, they could see key metrics about products and data on what effects the user interactions have had for the last 12 hours. 

Currently it only fires when an hour has been passed not automatically on the backend. This was because in production users would constantly be using the site and thus the system would fire. 

With more time we would probably rewrite it on the backend to fire system wide every hour. 

```
    if ( Math.floor((new Date() - 60000*60) > Math.floor(vm.product.views.lastTime))) {
      vm.product.views.lastTime = vm.time;
      vm.product.views.number.push(vm.product.views.count);
      vm.product.views.time.push(new Date().getHours());
``` 




```
    product.views.time = product.views.time.slice(Math.max(product.views.time.length - 12, 1));
    product.views.number = product.views.number.slice(Math.max(product.views.number.length - 12, 1));
    product.price.liveTime = product.price.liveTime.slice(Math.max(product.price.liveTime.length - 12, 1));
    product.price.livePriceDisplay = product.price.livePriceDisplay.slice(Math.max(product.price.livePriceDisplay.length - 12, 1));
```
 <em> The code we used for the graphs. </em> 
 
 We used angular-charts. 
#### Backend
## Stage 1
#### Challenges/Win (2 min) 
## Stage 2
#### Challenges/Win (2 min) with Code
## Stage 3

#### Challenges/Win (2 min) with Code

```
UpdatePricesCtrl.$inject = ['PricesFactory', 'TotalValueService', 'Product'];
function UpdatePricesCtrl(PricesFactory, TotalValueService, Product) {
  const vm = this;
  TotalValueService.getTotalValue();
  vm.findProduct = findPrices;
  Product.query().$promise.then(products => {
    vm.products = products;
    getMarketValue();
  });

  function findPrices(productId, $index){
    PricesFactory.query().$promise.then(data => {
      vm.purchase   = data[0].purchase;
      vm.watch      = data[0].watch;
      vm.view       = data[0].view;
      vm.profit     = data[0].profit;
      getTotalValue();
      findProduct(productId, $index);
      getMarketLiveValue();
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
    });
  }

  function getMultiplier(productId, $index){
    vm.multiplier = (vm.purchase.demo*vm.prodPurchase) * Math.pow(vm.watch.demo, vm.prodWatchByLen) * Math.pow(vm.view.demo, vm.prodViewsCount);
    setTimeout(function () {
      getNewLivePrice();
      getDifference(productId, $index);
    }, 15);
  }

  function getDifference(productId, $index) {
    vm.difference = (vm.prodPriceRetail * vm.multiplier) - vm.prodPriceRetail;
    getDebtPercentage(productId, $index);
  }
  
  function getNewLivePrice() {
    vm.newLivePrice = (vm.prodPriceLive*vm.multiplier);
  }

  function getDebtPercentage(productId, $index) {
    vm.debtPercentage = (vm.newLivePrice-vm.prodPriceRetail)/(vm.totalStockValue-vm.prodPriceRetail);
    vm.remainingTSV = vm.totalStockValue-vm.prodPriceRetail;
    updateAllProducts(productId, $index);
  }

  function updateAllProducts(productId, $index){
    vm.product.price.livePrice = vm.newLivePrice;
    vm.updateCount = 0;
    if ( Math.floor((new Date() - 60000*60) > vm.product.views.lastTime)) {
      vm.product.price.livePriceDisplay.push(vm.product.price.livePrice);
      vm.product.price.liveTime.push(new Date().getHours());
    }
    Product.update({ id: vm.product._id}, vm.product)
    .$promise
    .then(() => {
    }).catch(err => console.log(err));
    vm.products.forEach(product => {
      vm.updateCount ++;
      if (product._id !== productId) {
        vm.updateCount ++;
        product.price.livePrice = product.price.livePrice-(product.price.livePrice*vm.debtPercentage);

        if ( Math.floor((new Date() - 60000*60) > vm.product.views.lastTime)) {
          vm.product.price.livePriceDisplay.push(vm.product.price.livePrice);
          vm.product.price.liveTime.push(new Date().getHours());
        }
        
        Product.update({ id: product._id}, product).$promise.then(() => {
          console.log('Product Updated');
        }).catch(err => console.log(err));
      }
      
      if (vm.updateCount === vm.products.length) {
        getMarketLiveValue();
      }
    });
  }
```
## Stage 4 - Wishlist
### Future 
#### Market of Markets (Graphic)
#### Stripe Integration (Lee)
#### Backend Analysis 
## Biggest Takeaways 
#### Development in Teams
#### Efficient Planning & Task Delegation
#### Next Project
##### Sacrifices (Error, CSS, Testing, File Organisation)
##### Success (Amount achieved, completing our spec)










