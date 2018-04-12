import accountService from '../services/auth-management/notifier';

module.exports = () => hook => {
  const user = hook.result;
  if (hook.data && hook.data.email && user) {
    accountService(hook.app).notifier('resendVerifySignup', user);
    return hook;
  }

  return hook;
};
