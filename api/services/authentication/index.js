import auth from '@feathersjs/authentication';
import jwt from '@feathersjs/authentication-jwt';
import local from '@feathersjs/authentication-local';
import errors from '@feathersjs/errors';
import oauth2 from '@feathersjs/authentication-oauth2';
import FacebookTokenStrategy from 'passport-facebook-token';
import { discard } from 'feathers-hooks-common';
import { get } from 'lodash';
import { isEnabled } from '../../hooks';

function populateUser() {
  return async hook => {
    if (!get(hook, 'params.user')) {
      return Promise.reject(new errors.Forbidden('Credentials incorrect'));
    }
    hook.result.user = hook.params.user;
  };
}

export default function authenticationService() {
  const app = this;
  const config = app.get('authentication');
  app
    .configure(auth(config))
    .configure(jwt())
    .configure(local())
    .configure(oauth2({
      name: 'facebook',
      Strategy: FacebookTokenStrategy
    }));

  app.service('authentication').hooks({
    before: {
      create: [auth.hooks.authenticate(['jwt', 'local']), isEnabled()],
      remove: auth.hooks.authenticate('jwt')
    },
    after: {
      create: [populateUser(config), discard('user.password')]
    }
  });
}
