const { sendVerificationEmail } = require('../utils/mailgun')

module.exports = async (req, res) => {
  const email = req.body.email
  const code = req.body.code

  sendVerificationEmail(email, code, (error) => {
    if (error) {
      console.error(error)
      res.json({ body: error })
    } else {
      res.json({ body: 'success' })
    }
  })
}
