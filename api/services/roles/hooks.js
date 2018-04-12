import auth from '@feathersjs/authentication';
import { isEnabled, hasRole } from '../../hooks';
import { castArray } from 'lodash';
import commonHooks from 'feathers-hooks-common';

const filterOutSuperAdmin = function () {
  return function (hook) {
    if (hook.data && hook.params.user) {
      const items = castArray(commonHooks.getItems(hook)).filter(item => item.role !== 'superadmin');
      commonHooks.replaceItems(hook, items);
    }
  };
};

module.exports = {
  before: {
    all: [auth.hooks.authenticate('jwt'), isEnabled()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [commonHooks.unless(hasRole(['superadmin']), filterOutSuperAdmin())],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
