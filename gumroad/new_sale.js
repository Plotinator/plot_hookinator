var Mailchimp = require('mailchimp-api-v3')
var mailchimp = new Mailchimp(process.env.MAILCHIMP_TOKEN)

module.exports = async (req, res) => {
  // let fakeEmail = `${req.body.product_id}@gmail.com`
  let lists = await mailchimp.get('/lists')
  res.status(200).send(lists)
}
