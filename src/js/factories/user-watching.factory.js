angular
  .module('wineApp')
  .factory('UserWatchingFactory', UserWatchingFactory);

UserWatchingFactory.$inject = ['API', '$resource'];
function UserWatchingFactory(API, $resource){
  return $resource(`${API}/userswatching/:id`, { id: '@_id'}, {
  });
}
