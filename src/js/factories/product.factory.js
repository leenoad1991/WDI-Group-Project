angular
  .module('wineApp')
  .factory('Product', Product);

Product.$inject = ['$resource', 'API'];
function Product($resource, API) {
  console.log('running product factory');
  return $resource(`${API}/wines/:id`,
    { id: '@_id' },
    {
      'update': { method: 'PUT' }
    }
  );
}
