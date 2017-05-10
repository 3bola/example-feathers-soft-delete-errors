// Initializes the `random` service on path `/random`
const createService = require('feathers-nedb');
const createModel = require('../../models/random.model');
const hooks = require('./random.hooks');
const filters = require('./random.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'random',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/random', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('random');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
