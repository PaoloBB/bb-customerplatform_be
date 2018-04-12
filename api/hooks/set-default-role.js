import { get, castArray } from 'lodash';
import commonHooks from 'feathers-hooks-common';
import { to } from '../utils/to';

module.exports = function () {
  return function (hook) {
    return new Promise(async resolve => {
      if (hook.data) {
        const settings = await to(hook.app.service('settings').find({ name: 'defaultRole' }));
        if (!settings.err) {
          const role = get(get(settings.defaultRole, '0'), 'value.role') || 'basic';

          castArray(commonHooks.getItems(hook)).forEach(item => {
            item.role = role;
          });
        } else {
          console.log('Error setting default role', settings.err);
        }

        resolve(hook);
      }
    });
  };
};
