import { get } from 'lodash';
import errors from '@feathersjs/errors';

module.exports = function hasRole(param, forceError) {
  return function (hook) {
    const roles = param.constructor === Array ? param : [param];
    if (get(hook, 'params.user')) {
      const _hasRoles = roles.indexOf(get(hook, 'params.user.role')) > -1;
      if (forceError) {
        if (!_hasRoles) {
          throw new errors.GeneralError('User does not have the permission to perform this operation');
        }
      } else {
        return _hasRoles;
      }
    }
  };
};
