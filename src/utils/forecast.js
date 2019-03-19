const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/852756f18aa51c7e2679ad72f02d4991/' + lat +',' + long
  request( {url, json: true}, (error, { body }) => {

    if (error) {
      callback('Unable to connect to darksky api', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const currently = body.currently
      callback(undefined, `The current temperature is ` + currently.temperature + ` and there is ` + currently.precipProbability + `% of rain.`)
    }
  })
}

module.exports = forecast
