// Initializes the `email` service on path `/email`
import requestPromise from 'request-promise';
import { merge } from 'lodash';
import hooks from './hooks';

module.exports = function () {
  const app = this;

  const EMAIL_TOKEN = app.get('EMAIL_TOKEN');
  const EMAIL_API_URL = app.get('EMAIL_API_URL');

  const emailAPIOptions = {
    method: 'POST',
    uri: EMAIL_API_URL,
    form: {
      token: EMAIL_TOKEN,
      message: '',
      receivers: '',
      subject: ''
    }
  };

  // Initialize our service with any options it requires
  app.use('/emails', {
    create(data) {
      return new Promise(resolve => {
        const payout = merge({}, emailAPIOptions, {
          form: {
            subject: data.subject,
            message: data.html,
            receivers: data.to
          }
        });
        resolve(requestPromise(payout));
      });
    }
  });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails');
  service.hooks(hooks);
};
