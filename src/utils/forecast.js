const request = require('request')

const forecast = (x, y, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ x +'&lon='+ y +'&units=metric&APPID=2fd2cda3e1883c6e7a3f6cbd3e46eeba'
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to reach forecast service!', undefined)
        } else if (body.cod && body.cod!==200) {
            callback('No location found, try again!', undefined)
        } else {
            callback(undefined, {
                forecast: 'the weather is ' + body.weather[0].description+ '. It is currently '+ body.main.temp+
                'degrees out there. There is '+ body.main.humidity + ' chance of rain.'
            })
        }
    })
}
module.exports = forecast