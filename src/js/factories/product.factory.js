angular
  .module('wineApp')
  .factory('Product', Product);

Product.$inject = ['$resource', 'API'];
function Product($resource, API) {
  return $resource(`${API}/wines/:id`,
    { id: '@_id' },
    {
      'update': { method: 'PUT' },
      'create': { method: 'POST' }
    }
  );
}
