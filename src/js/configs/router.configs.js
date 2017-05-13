angular
.module('wineApp')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function Router($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  const Auth = ['$q', 'TokenService', function ($q, TokenService) {
    if (TokenService.getToken()) {
      return $q.when(TokenService.getToken);
    } else {
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
  });
  $urlRouterProvider.otherwise('/');
}
