const path = require('path');
const express = require('express');
const exp = require('constants');
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();

// define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');
console.log(publicPath);

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));


app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather App',
        name: 'Vikas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vikas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is a help page",
        title: 'Help Page',
        name: 'Vikas'
    })
})


app.get('/Weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error){
            return res.send({
                error
            })
        }
        // console.log(response);
        forecast(latitude,longitude, (error, response) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: response,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     city: "ajmer",
    //     temperature : '20 degrees',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404 Page',
        name: 'Vikas',
        errorMessage: 'Help Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikas',
        errorMessage: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server is up and running');
})