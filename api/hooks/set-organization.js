import { castArray } from 'lodash';
import commonHooks from 'feathers-hooks-common';

module.exports = function () {
  return function (hook) {
    if (!hook.params.provider) {
      return true;
    }
    return new Promise(async resolve => {
      if (hook.data && hook.params.user) {
        castArray(commonHooks.getItems(hook)).forEach(item => {
          item.idOrganization = hook.params.user.idOrganization;
        });
        resolve(hook);
      }
    });
  };
};
