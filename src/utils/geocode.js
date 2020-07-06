const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWRpdHlhMDAwOCIsImEiOiJja2M4bXMwcHgxZDRnMzNtZ3h1MDlwMzFzIn0.KTTo3v3lmovo-EwIuwjHSw&limit=1'
    request({url, json:true}, (error, response)=> {
        if(error) {
            callback('unable to connect to location services!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location, try again!', undefined)
        }
        else callback(undefined, {
            longitude : response.body.features[0].center[0],
            latitude : response.body.features[0].center[1],
            location: response.body.features[0].place_name
        })
    })
}

module.exports =  geocode