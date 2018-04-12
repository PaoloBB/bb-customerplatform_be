import auth from '@feathersjs/authentication';
import commonHooks from 'feathers-hooks-common';
import { hasRole } from '../../hooks';

const hooks = {
  before: {
    find: [],
    get: [],
    create: [],
    update: [commonHooks.disallow()],
    patch: [],
    remove: [],
    all: [auth.hooks.authenticate('jwt'), hasRole('superadmin', true)]
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default hooks;
