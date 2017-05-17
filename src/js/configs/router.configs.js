angular
.module('wineApp')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function Router($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  const Auth = ['$q', 'TokenService', '$state', function ($q, TokenService, $state) {
    if (TokenService.getToken()) {
      return $q.when(TokenService.getToken);
    } else {
      $state.go('login');
      return $q.reject({ authenticated: false });
    }
  }];

  const Home = ['$q', 'TokenService', '$state', function ($q, TokenService, $state) {
    if (TokenService.getToken()) {
      $state.go('productsIndex');
      return $q.when(TokenService.getToken);
    }
  }];

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'js/views/home.html',
    resolve: {
      auth: Home
    }
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/users/register.html',
    controller: 'UserRegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/users/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('productsIndex', {
    url: '/wines',
    templateUrl: '/js/views/product/index.html',
    controller: 'ProductsIndexCtrl',
    controllerAs: 'productsIndex',
    resolve: {
      auth: Auth
    }
  })
  .state('productsShow', {
    url: '/wines/:id',
    templateUrl: '/js/views/product/show.html',
    controller: 'ProductsShowCtrl',
    controllerAs: 'productsShow'
  })
  .state('productsEdit', {
    url: '/wines/:id/edit',
    templateUrl: '/js/views/product/edit.html',
    controller: 'ProductsEditCtrl',
    controllerAs: 'productsEdit'
  })
  .state('account', {
    url: '/account',
    templateUrl: '/js/views/users/account.html'
  })
  .state('account.watchlist', {
    url: '/watchlist',
    templateUrl: '/js/views/users/account/watchlist.html',
    controller: 'UsersWatchlistCtrl',
    controllerAs: 'watchlist'
  })
  .state('account.editProfile', {
    url: '/edit',
    templateUrl: '/js/views/users/account/edit.html',
    controller: 'UserEditCtrl',
    controllerAs: 'userEdit'
  })
  .state('account.paymentOptions', {
    url: '/payment',
    templateUrl: '/js/views/users/account/payment.html',
    controller: 'UserPaymentCtrl',
    controllerAs: 'userPayment'
  })
  .state('account.orders', {
    url: '/orders',
    templateUrl: '/js/views/users/account/orders.html',
    controller: 'UserOrdersCtrl',
    controllerAs: 'userOrders'
  })
  .state('account.ordersAll', {
    url: '/admin/orders/all',
    templateUrl: '/js/views/users/account/admin/all-orders.html',
    controller: 'AllOrdersCtrl',
    controllerAs: 'allOrders'
  })
  .state('account.users', {
    url: '/admin/users',
    templateUrl: '/js/views/users/account/admin/user-index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'usersIndex'
  })
  .state('account.userShow', {
    url: '/admin/user/:id',
    templateUrl: '/js/views/users/account/admin/user-show.html',
    controller: 'UsersShowCtrl',
    controllerAs: 'usersShow'
  })
  .state('account.stock', {
    url: '/admin/stock/all',
    templateUrl: '/js/views/users/account/admin/stock.html',
    controller: 'StockViewCtrl',
    controllerAs: 'stockView'
  })
  .state('account.stockShow', {
    url: '/admin/stock/all/:id',
    templateUrl: '/js/views/users/account/admin/stock-show.html',
    controller: 'StockShowCtrl',
    controllerAs: 'stockShow'
  })
  .state('account.stockEdit', {
    url: '/admin/stock/all/:id/edit',
    templateUrl: '/js/views/users/account/admin/stock-edit.html',
    controller: 'StockEditCtrl',
    controllerAs: 'stockEdit'
  })
  .state('account.stockAdd', {
    url: '/admin/stock/add',
    templateUrl: '/js/views/users/account/admin/stock-add.html',
    controller: 'StockAddCtrl',
    controllerAs: 'stockAdd'
  })
  .state('account.prices', {
    url: '/admin/prices',
    templateUrl: '/js/views/product/prices-test.html',
    controller: 'UpdatePricesCtrl',
    controllerAs: 'pricesUpdate'
  });
  $urlRouterProvider.otherwise('/');
}
