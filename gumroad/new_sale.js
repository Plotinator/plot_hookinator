var Mailchimp = require('mailchimp-api-v3')
var mailchimp = new Mailchimp(process.env.MAILCHIMP_TOKEN)

const PLOTTR_LIST_URL = 'https://us3.api.mailchimp.com/3.0/lists/4d4d9bfc24/members'
const TRIAL_LIST_URL = 'https://us3.api.mailchimp.com/3.0/lists/e32e48b713/members'

module.exports = async (req, res) => {
  let fakeEmail = `${req.body.product_id}@gmail.com`
  let list = await mailchimp.post(PLOTTR_LIST_URL, {
    email_address: fakeEmail,
    status: 'subscribed',
  })
  res.status(200).send(list)
}
