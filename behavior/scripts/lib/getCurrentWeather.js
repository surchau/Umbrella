'use strict'

const request = require('request')

module.exports = function getCurrentWeather(locationName, next) {
    const appId = '243a4be2ddf76b9cf7299849d34103a8'

    //const requestUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${appId}&q=${locationName}'
    // const requestUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + appId + '&q=' + { locationName }
    
    console.log('locationName is ', { locationName })
    console.log('again ---' + locationName)
    
   
     const requestUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=243a4be2ddf76b9cf7299849d34103a8&q='+locationName
    console.log('Making HTTP GET request to:', requestUrl)

    request(requestUrl, (err, res, body) => {
        if (err) {
            throw new Error(err)
        }

        if (body) {
            const parsedResult = JSON.parse(body)
            next(parsedResult)
        } else {
            next()
        }
    })
}
