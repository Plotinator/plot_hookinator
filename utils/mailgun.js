const domain = 'mg.getplottr.com'
const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_KEY, domain: domain })

function sendVerificationEmail(email, code, cb) {
  const data = {
    from: 'Plottr <support@getplottr.com>',
    to: email,
    subject: 'Plottr mobile app verification',
    template: 'verify_plottr_mobile_access',
    'v:code': code,
  }

  mailgun.messages().send(data, (error, body) => {
    console.log('BODY', body);
    if (error) {
      cb(error);
    } else {
      cb(false);
    }
  })
}

module.exports = { sendVerificationEmail }