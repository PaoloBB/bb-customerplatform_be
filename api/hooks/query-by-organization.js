module.exports = function () {
  return function (hook) {
    hook.params.query.idOrganization = hook.params.user.idOrganization;
    return hook;
  };
};
