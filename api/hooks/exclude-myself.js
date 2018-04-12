module.exports = function () {
  return function (hook) {
    hook.params.query.id = {
    	$ne: hook.params.user.id
    }
    return hook;
  };
};
