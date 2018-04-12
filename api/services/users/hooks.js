import auth from '@feathersjs/authentication';
import local from '@feathersjs/authentication-local';
import errors from '@feathersjs/errors';
import commonHooks from 'feathers-hooks-common';
import { restrictToOwner } from 'feathers-authentication-hooks';
import authManagement from 'feathers-authentication-management';

import { required, email, match, unique, oneOf } from 'utils/validation';
import { get } from 'lodash';

import {
  preventSetAsARole,
  sendVerificationEmail,
  setFirstUserToRole,
  setDefaultRole,
  isEnabled,
  limitByOrganization,
  setOrganization,
  hasRole,
  validateUser
} from '../../hooks';

const restrict = [
  auth.hooks.authenticate('jwt'),
  isEnabled(),
  commonHooks.unless(
    hasRole(['superadmin', 'admin']),
    restrictToOwner({
      idField: 'id',
      ownerField: 'id'
    })
  ),
  commonHooks.when(
    commonHooks.isProvider('external'),
    commonHooks.unless(hasRole(['superadmin']), limitByOrganization())
  )
];

const schema = {
  include: [
    {
      service: 'roles',
      nameAs: 'access',
      parentField: 'role',
      childField: 'role',
      provider: undefined
    }
  ]
};

const serializeSchema = {
  computed: {
    permissions: item => get(item, 'access.permissions')
  },
  exclude: ['access', '_include']
};

const userHooks = {
  before: {
    find: [auth.hooks.authenticate('jwt'), isEnabled()],
    get: [auth.hooks.authenticate('jwt'), isEnabled()],
    create: [
      validateUser('insert'),
      commonHooks.when(hook => hook.params.user.role === 'admin', setOrganization()),
      commonHooks.discard('password_confirmation'),
      local.hooks.hashPassword(),
      authManagement.hooks.addVerification(),
      setDefaultRole(),
      setFirstUserToRole({ role: 'admin' }),
      hasRole(['admin', 'superadmin'], true)
    ],
    update: [commonHooks.disallow()],
    patch: [
      ...restrict,
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
          'resetExpires',
          'role'
        )
      ),
      local.hooks.hashPassword(),
      commonHooks.unless(hasRole(['superadmin']), commonHooks.preventChanges('idOrganization')),
      commonHooks.unless(hasRole(['superadmin', 'admin']), commonHooks.preventChanges('email')),
      commonHooks.unless(hasRole(['superadmin']), preventSetAsARole('superadmin'))
    ],
    remove: [...restrict, hasRole(['admin', 'superadmin'], true)],
    all: []
  },
  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password', '_computed', 'verifyExpires', 'resetExpires', 'verifyChanges')
      ),
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
      local.hooks.protect('password'),
      commonHooks.alterItems(rec => {
        if (rec.permissions) {
          rec.permissions = rec.permissions.split(',').map(p => p.trim());
        }
      })
    ],
    find: [],
    get: [],
    create: [sendVerificationEmail(), authManagement.hooks.removeVerification()],
    update: [],
    patch: [],
    remove: []
  }
};

export default userHooks;
