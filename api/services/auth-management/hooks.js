import auth from '@feathersjs/authentication';
import commonHooks from 'feathers-hooks-common';
import isEnabled from '../../hooks/is-enabled';

const isAction = () => {
  const args = Array.from(arguments);
  return hook => args.includes(hook.data.action);
};

const authManagementHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      commonHooks.iff(isAction('passwordChange', 'identityChange'), [auth.hooks.authenticate('jwt'), isEnabled()])
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
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

export default authManagementHooks;
