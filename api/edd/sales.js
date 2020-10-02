import axios from 'axios'
import dateFormat from 'dateformat'

const BASE_URL = 'http://getplottr.com'

module.exports = async (req, res) => {

  const basicSales = await axios.get(basicSalesURL())
  const todaySales = await axios.get(todaySalesURL())
  const allTimeSales = await axios.get(allTimeSalesURL())

  res.json({ basicSales, todaySales, allTimeSales })
}

function basicSalesURL() {
  return apiURL()
}

function todaySalesURL() {
  return apiURL('&date=today')
}

function allTimeSalesURL() {
  const now = new Date()
  return apiURL(`&date=range&startdate=20200501&enddate=${dateFormat(now, 'yyyymmdd')}`)
}

function apiURL(params = '') {
  return `${BASE_URL}/edd-api/stats/?key=${process.env.EDD_KEY}&token=${process.env.EDD_TOKEN}&number=-1&type=sales${params}`;
}
