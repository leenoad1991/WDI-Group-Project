angular
  .module('wineApp')
  .factory('PricesFactory', PricesFactory);

PricesFactory.$inject = ['$resource', 'API'];
function PricesFactory($resource, API) {
  return $resource(`http://localhost:7000/api/prices/:id`,
    { id: '@_id' },
    {
      'update': { method: 'PUT' }
    }
  );
}
