import errors from '@feathersjs/errors';
import { to } from '../utils/to';

module.exports = function () {
  return function (hook) {
    return new Promise(async (resolve, reject) => {
      const [err, user] = await to(hook.app.service('users').get(hook.id));
      if (!err) {
        if (hook.params.user.idOrganization !== user.idOrganization) {
          reject(new errors.GeneralError('User does not have the permission to perform this operation'));
        }
      }
      resolve(hook);
    });
  };
};
