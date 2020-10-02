import axios from 'axios'
import dateFormat from 'dateformat'

const BASE_URL = 'http://getplottr.com'

module.exports = async (req, res) => {
  let basicSales = null, todaySales = null, allTimeSales = null

  console.log('IN THE FUNCTION')

  try {
    console.log('basicSales', basicSalesURL())
    basicSales = await axios.get(basicSalesURL())
    console.log(basicSales)
  } catch (error) {
    return res.json({ error })
  }
  try {
    console.log('todaySales', todaySalesURL())
    todaySales = await axios.get(todaySalesURL())
    console.log(todaySales)
  } catch (error) {
    return res.json({ error })
  }
  try {
    console.log('allTimeSales', allTimeSalesURL())
    allTimeSales = await axios.get(allTimeSalesURL())
    console.log(allTimeSales)
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
