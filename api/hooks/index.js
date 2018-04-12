module.exports = {
  isEnabled: require('./is-enabled.js'),
  validateUser: require('./validate-user.js'),
  queryByOrganization: require('./query-by-organization.js'),
  excludeMySelf: require('./exclude-myself.js'),
  limitByOrganization: require('./limit-by-organization.js'),
  hasRole: require('./has-role.js'),
  hasPermissionsBoolean: require('./has-permissions-boolean.js'),
  setOrganization: require('./set-organization.js'),
  validateHook: require('./validateHook'),
  sendVerificationEmail: require('./sendVerificationEmail.js'),
  setDefaultRole: require('./set-default-role.js'),
  setFirstUserToRole: require('./set-first-user-to-role.js'),
  preventSetAsARole: require('./prevent-set-as-a-role.js')
};
