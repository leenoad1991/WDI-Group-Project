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

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'js/views/home.html'
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
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'usersIndex'
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
  });
  $urlRouterProvider.otherwise('/');
}
