angular
  .module('wineApp')
  .factory('PricesFactory', PricesFactory);

PricesFactory.$inject = ['$resource', 'API'];
function PricesFactory($resource, API) {
  return $resource(`${API}/prices/:id`,
    { id: '@_id' },
    {
      'update': { method: 'PUT' }
    }
  );
}
