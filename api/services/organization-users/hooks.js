import auth from '@feathersjs/authentication';
import local from '@feathersjs/authentication-local';
import commonHooks from 'feathers-hooks-common';
import { restrictToOwner } from 'feathers-authentication-hooks';
import { excludeMySelf, hasRole, queryByOrganization, limitByOrganization, preventSetAsARole, validateUser } from '../../hooks';
import errors from '@feathersjs/errors';

const restrict = [
  auth.hooks.authenticate('jwt'),
  hasRole(['admin', 'superadmin'], true),
  commonHooks.unless(
    hasRole(['superadmin', 'admin']),
    restrictToOwner({
      idField: 'id',
      ownerField: 'id'
    })
  ),
  commonHooks.unless(hasRole(['superadmin']), limitByOrganization())
];

const hooks = {
  before: {
    find: [excludeMySelf(), commonHooks.when(hook => hook.params.user.role === 'admin', queryByOrganization())],
    get: [commonHooks.when(hook => hook.params.user.role === 'admin', queryByOrganization())],
    create: [commonHooks.disallow()],
    update: [commonHooks.disallow()],
    patch: [
      validateUser('edit'),
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        )
      ),
      local.hooks.hashPassword(),
      commonHooks.unless(hasRole(['superadmin']), commonHooks.preventChanges('idOrganization')),
      commonHooks.unless(hasRole(['superadmin', 'admin']), commonHooks.preventChanges('email')),
      commonHooks.unless(hasRole(['superadmin']), preventSetAsARole('superadmin'))
    ],
    remove: [hasRole(['admin', 'superadmin'], true)],
    all: [...restrict]
  },
  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard(
          'isVerified',
          'password',
          '_computed',
          'verifyExpires',
          'resetExpires',
          'verifyChanges',
          'verifyToken',
          'resetToken'
        )
      ),
      commonHooks.unless(hasRole(['superadmin']), commonHooks.discard('idOrganization'))
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default hooks;
