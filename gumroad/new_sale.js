const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP_TOKEN)
const md5 = require('js-md5')

const PLOTTR_PRODUCT_ID = 'RxdkAsM4CXkeT-g9yy6NiQ=='
const PLOTTR_LIST_URL = '/lists/4d4d9bfc24/members'
const TRIAL_LIST_URL = '/lists/e32e48b713/members'

module.exports = async (req, res) => {
  console.log('Product ID', req.body.product_id)
  if (req.body.product_id == PLOTTR_PRODUCT_ID) {
    let fakeEmail = `cameronsutter.author@gmail.com`
    try {
      await mailchimp.post(PLOTTR_LIST_URL, {
        email_address: fakeEmail,
        status: 'subscribed',
      })
    } catch (err) {
      console.error(err)
    }

    // let hash = md5(req.body.email)
    // try {
    //   const memberUrl = `${TRIAL_LIST_URL}/${hash}`
    //   let member = await mailchimp.get(memberUrl)
    //   if (member.status == 'subscribed') {
    //     await mailchimp.delete(memberUrl)
    //   }
    // } catch (err) {
    //   // probably not subscribed ?
    // }
  }
  res.status(200)
}
