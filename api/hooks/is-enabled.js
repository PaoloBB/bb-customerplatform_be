import { get } from 'lodash';
import errors from '@feathersjs/errors';

module.exports = function isEnabled() {
  return function (hook) {
    if (get(hook, 'params.user')) {
      if (!get(hook, 'params.user.isEnabled')) {
        throw new errors.GeneralError('User is not enabled');
      }
    }
    return hook;
  };
};
