const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY ;

    // console.log(url)
    request({url, json:true}, (error, {body}) => {
        // console.log(body);
        if(error){
            callback("Can't fetch data from api", undefined);
        }
        else if(!body.main || !body.weather || !body.main.temp || !body.name){
            callback("Unable to get the location", undefined);
        }
        else{
            callback(undefined, {
                temp: body.main.temp,
                desc: body.weather[0].description,
                cityName: body.name,
            })
        }
    })
    // callback(true);
}

module.exports = weatherData ;