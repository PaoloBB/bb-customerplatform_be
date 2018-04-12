const isProd = process.env.NODE_ENV === 'production';
const path = require('path');

const pug = require('pug');

export default function (app) {
  const returnEmail = app.get('complaint_email') || process.env.COMPLAINT_EMAIL;

  function getLink(type, hash) {
    const port = app.get('port') === '80' || isProd ? '' : `:${app.get('port')}`;
    const host = app.get('host') === 'HOST' ? 'localhost' : app.get('host');
    let protocol = app.get('protocol') === 'PROTOCOL' ? 'http' : app.get('protocol');
    protocol += '://';
    return `${protocol}${host}${port}/login/${type}/${hash}`;
  }

  function sendEmail(email) {
    return app
      .service('emails')
      .create(email)
      .then(result => {
        console.log('Sent email', result);
      })
      .catch(err => {
        console.log('Error sending email', err);
      });
  }

  return {
    resetDelay: 1000 * 60 * 60 * 24 * 5,
    notifier(type, user) {
      console.log(`-- Preparing email for ${type}`);

      let hashLink;
      let email;
      const emailAccountTemplatesPath = path.join(app.get('src'), 'email-templates', 'account');

      let templatePath;
      let compiledHTML;
      switch (type) {
        case 'resendVerifySignup': // send another email with link for verifying user's email addr
          hashLink = getLink('verify', user.verifyToken);
          templatePath = path.join(emailAccountTemplatesPath, 'verify-email.pug');
          compiledHTML = pug.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            to: user.email,
            subject: 'Confirm Signup',
            html: compiledHTML
          };

          return sendEmail(email);

        case 'verifySignup': // inform that user's email is now confirmed
          hashLink = getLink('verify', user.verifyToken);

          templatePath = path.join(emailAccountTemplatesPath, 'email-verified.pug');
          compiledHTML = pug.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            to: user.email,
            subject: 'Thank you, your email has been verified',
            html: compiledHTML
          };

          return sendEmail(email);

        case 'sendResetPwd': // inform that user's email is now confirmed
          hashLink = getLink('reset', user.resetToken);

          templatePath = path.join(emailAccountTemplatesPath, 'reset-password.pug');
          compiledHTML = pug.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            to: user.email,
            subject: 'Reset Password',
            html: compiledHTML
          };

          return sendEmail(email);

        case 'resetPwd': // inform that user's email is now confirmed
          hashLink = getLink('reset', user.resetToken);

          templatePath = path.join(emailAccountTemplatesPath, 'password-was-reset.pug');
          compiledHTML = pug.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            to: user.email,
            subject: 'Your password was reset',
            html: compiledHTML
          };

          return sendEmail(email);

        case 'passwordChange':
          templatePath = path.join(emailAccountTemplatesPath, 'password-change.pug');
          compiledHTML = pug.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            returnEmail
          });

          email = {
            to: user.email,
            subject: 'Your password was changed',
            html: compiledHTML
          };

          return sendEmail(email);

        default:
          break;
      }
    }
  };
}
