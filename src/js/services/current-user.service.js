angular
.module('wineApp')
.service('CurrentUserService', CurrentUserService);

<<<<<<< HEAD
CurrentUserService.$inject = ['TokenService', '$rootscope', 'UserFactory'];
function CurrentUserService(TokenService, $rootscope, UserFactory) {
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
        $rootscope.$broadcast('loggedIn');
      });
    }
  };
  self.removeUser = () => {
    self.currentUser = null;
    TokenService.removeToken();
    $rootscope.$broadcast('loggedOut');
  };
}
=======
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
          $rootScope.$broadcast('LoggedIn');
        });
      }
    };
    self.removeUser = () => {
      self.currentUser = null;
      TokenService.removeToken();
      $rootScope.$broadcast('LoggedOut');
    };
  }
>>>>>>> 05f074327277aa32df0a658a7b51ac99a9722fc7
