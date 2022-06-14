const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=584eeaffb3c5c0c21abd2d88b1ad14e3&query=' + latitude + ',' + longitude + '&units=s'

    request({url, json:true}, (error, {body}) => {
        if (error) {
                callback('Unable to connect to weather service!')
            } else if (body.error) {
                callback('Unable to find location')
            } else {
                data = body.current;
            callback(undefined, 
                `${data.weather_descriptions[0]}. It is currently ${data.temperature} degress kelvin outside, with wind speeds of ${data.wind_speed}mph, ${data.precip}% chance of rain and ${data.humidity}% humidity. UV index is at ${data.uv_index} today, while cloud cover is ${data.cloudcover}.`
            //     {
            //     forecast: body.current.weather_descriptions[0],
            //     temperature: body.current.temperature
            // }
            )}
            }
    )}


module.exports = forecast
