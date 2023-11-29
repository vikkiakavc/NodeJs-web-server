const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7a95811462ec2e1dabdc214ad4919eed&query=' + latitude + ',' + longitude ;
    request({url, json: true} , (error, {body}) => {
        if (error){
            callback('unable to connect to weather service!');
        }else if (body.error){
            callback('unable to find location! Try another search');
        }else{
            // console.log(response.body);
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees' + '. There are ' + body.current.precip + '% chances of rain');
        }
    })
}

module.exports = forecast;