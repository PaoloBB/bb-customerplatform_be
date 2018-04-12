import { castArray } from 'lodash';
import commonHooks from 'feathers-hooks-common';

module.exports = options => hook =>
  new Promise((resolve, reject) => {
    hook.app
      .service('/users')
      .find({ query: {} })
      .then(
        found => {
          console.log('Checking if first user');
          if (!Array.isArray(found) && found.data) {
            found = found.data;
          }

          if (found.length === 0) {
            const firstUser = castArray(commonHooks.getItems(hook))[0];

            firstUser.role = options.role || 'admin';
            console.log('set role to admin');
          }

          resolve(hook);
        },
        err => {
          reject(err);
        }
      );
  });
