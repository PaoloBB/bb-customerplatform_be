const _ = require('lodash');

module.exports = function hasPermissionsBoolean() {
  const permissions = Array.from(arguments) || [];

  return function (hook) {
    if (!hook.params.provider) {
      return true;
    }

    if (
      !_.get(hook, 'params.user.role') === 'admin' ||
      !_.get(hook, 'params.user.permissions') ||
      !permissions.every(p => hook.params.user.permissions.includes(p))
    ) {
      return false;
    }

    return true;
  };
};
