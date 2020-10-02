import axios from 'axios'
import dateFormat from 'dateformat'

const BASE_URL = 'http://getplottr.com'

module.exports = async (req, res) => {
  let response = null,
    basicSales = null, basicEarnings = null, yesterdaySales = null, allTimeSales = null

  try {
    response = await axios.get(basicSalesURL())
    basicSales = response.data
  } catch (error) {
    return res.json({ error })
  }
  try {
    response = await axios.get(basicEarningsURL())
    basicEarnings = response.data
  } catch (error) {
    return res.json({ error })
  }
  try {
    response = await axios.get(yesterdaySalesURL())
    yesterdaySales = response.data
  } catch (error) {
    return res.json({ error })
  }
  try {
    response = await axios.get(allTimeSalesURL())
    allTimeSales = response.data
  } catch (error) {
    return res.json({ error })
  }

  res.json({ basicSales, basicEarnings, yesterdaySales, allTimeSales })
}

function basicEarningsURL() {
  return apiURL('&type=earnings')
}

function basicSalesURL() {
  return apiURL('&type=sales')
}

function yesterdaySalesURL() {
  return apiURL('&type=sales&date=yesterday')
}

function allTimeSalesURL() {
  const now = new Date()
  return apiURL(`&type=sales&date=range&startdate=20200501&enddate=${dateFormat(now, 'yyyymmdd')}`)
}

function apiURL(params = '') {
  return `${BASE_URL}/edd-api/stats/?key=${process.env.EDD_KEY}&token=${process.env.EDD_TOKEN}${params}`;
}
