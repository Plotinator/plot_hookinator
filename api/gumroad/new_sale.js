const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP_TOKEN)
const md5 = require('js-md5')

const PLOTTR_PRODUCT_ID = 'RxdkAsM4CXkeT-g9yy6NiQ=='
const PLOTTR_LIST_URL = '/lists/4d4d9bfc24/members'
const TRIAL_LIST_URL = '/lists/e32e48b713/members'

module.exports = async (req, res) => {
  if (req.body.product_id == PLOTTR_PRODUCT_ID) {
    // add to Plottr list
    try {
      console.log(`adding ${req.body.email} to Plottr list`)
      await mailchimp.post(PLOTTR_LIST_URL, {
        email_address: req.body.email,
        status: 'subscribed',
      })
    } catch (err) {
      console.error(err)
    }

    // Remove from FreeTrial list
    let hash = md5(req.body.email)
    try {
      console.log(`attempting to find ${req.body.email} in free trial list`)
      const memberUrl = `${TRIAL_LIST_URL}/${hash}`
      let member = await mailchimp.get(memberUrl)
      if (member.status == 'subscribed') {
        console.log(`removing ${req.body.email} from free trial list`)
        await mailchimp.delete(memberUrl)
      }
    } catch (err) {
      // probably not subscribed ?
      console.error('PROBABLY not subscribed')
      console.error(err)
    }
  }
  res.status(200).send()
}
