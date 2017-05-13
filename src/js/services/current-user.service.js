angular
  .module('wineApp')
  .service('CurrentUserService', CurrentUserService);

  CurrentUserService.$inject = ['TokenService', '$rootScope', 'UserFactory'];
  function CurrentUserService(TokenService, $rootScope, UserFactory) {
    const self = this;
    self.getUser = () => {
      const decoded = TokenService.decodeToken();
      if (decoded) {
        UserFactory
        .get({id: decoded.id})
        .$promise
        .then(user => {
          console.log(user, 'User returned');
          self.currentUser = user;
          $rootScope.$broadcast('loggedIn');
        });
      }
    };
    self.removeUser = () => {
      self.currentUser = null;
      TokenService.removeToken();
      $rootScope.$broadcast('loggedOut');
    };
  }
