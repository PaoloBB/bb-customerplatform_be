import validateHook from './validateHook';
import { required, email, match, unique, oneOf } from 'utils/validation';
import errors from '@feathersjs/errors';

const schemas = {
  insert: {
    email: [required, email, unique('email')],
    password: required,
    password_confirmation: [required, match('password')],
    role: [oneOf('/roles', 'role')]
  },
  edit: {
    email: [required, email],
    password: required,
    password_confirmation: [required, match('password')],
    role: [oneOf('/roles', 'role')]
  }
};

function validate(schemaValidator) {
  return hook => {
    if (hook.data.facebook && !hook.data.email) {
      throw new errors.BadRequest('Incomplete oauth registration', hook.data);
    }
    return validateHook(schemas[schemaValidator])(hook);
  };
}
export default validate;
