angular
.module('wineApp')
.service('CurrentUserService', CurrentUserService);

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
