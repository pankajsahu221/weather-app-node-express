const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 3000 ;

const weatherData = require('../utils/weatherData');

const publicStaticDirPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('/', (req, res)=>{
    res.render('index', {
        title: "Weather App"
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address ;

    if(!address){
        return res.send({
            error: "You must enter address in input box",
        })
    }

    weatherData(address, (error, {temp, desc, cityName} = {} ) => {
        
        if(error){
            return res.send({
                error
            })
        }
        console.log(temp, desc, cityName);
        res.send({temp, desc, cityName});
    });
    
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Page not found!'
    })
})

app.listen(port, ()=> { console.log(`listning to port ${port}`)});