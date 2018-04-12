// Initializes the `settings` service on path `/settings`
import service from 'feathers-sequelize';
import SettingsModelFactory from '../../models/settings';
import hooks from './hooks';
import filters from './filters';

export default function settingsService() {
  const app = this;
  const Model = SettingsModelFactory(app);

  const options = {
    name: 'settings',
    Model
  };
  app.use('/settings', service(options));
  const settings = app.service('settings');
  settings.hooks(hooks);

  if (settings.filter) {
    settings.filter(filters);
  }
}
