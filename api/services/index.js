import users from './users';
import organizations from './organizations';
import organizationUsers from './organization-users';
import messages from './messages';
import authManagement from './auth-management';
import email from './email';
import settings from './settings';
import roles from './roles';

export default function services() {
  const app = this;
  app.configure(authManagement);
  app.configure(users);
  app.configure(organizations);
  app.configure(organizationUsers);
  app.configure(messages);
  app.configure(email);
  app.configure(settings);
  app.configure(roles);
}
