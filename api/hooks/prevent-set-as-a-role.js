import { get } from 'lodash';
import errors from '@feathersjs/errors';

module.exports = function preventSetAsARole(param) {
  return hook => {
    if (hook.data.role === param) {
      throw new errors.BadRequest('Operation forbidden');
    }
    return hook;
  };
};
