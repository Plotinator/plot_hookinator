import axios from 'axios'
import dateFormat from 'dateformat'

const BASE_URL = 'http://getplottr.com'

module.exports = async (req, res) => {
  let response = null, basicSales = null, todaySales = null, allTimeSales = null

  try {
    response = await axios.get(basicSalesURL())
    basicSales = response.data
  } catch (error) {
    return res.json({ error })
  }
  try {
    response = await axios.get(todaySalesURL())
    todaySales = response.data
  } catch (error) {
    return res.json({ error })
  }
  try {
    response = await axios.get(allTimeSalesURL())
    allTimeSales = response.data
  } catch (error) {
    return res.json({ error })
  }

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
  return `${BASE_URL}/edd-api/stats/?key=${process.env.EDD_KEY}&token=${process.env.EDD_TOKEN}&type=sales${params}`;
}
