const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and view locations
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Aditya'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Aditya'
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        message: 'help yourself',
        title: 'Help Page',
        name: 'Aditya'
    })
})

app.get('/weather', (req,res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address!'
        })
    }

    geocode((req.query.address), (error, {latitude, longitude, location} = {})=> {
        if(error) {
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData)=> {
            if(error) {
                return res.send({error: error})
            }

            res.send({
                forecast: forecastData.forecast,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term!'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=> {
    res.render('notfound', {
        title: '404',
        name: 'Aditya',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req,res)=> {
    res.render('notfound', {
        title: '404',
        name: 'Aditya',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up!')
})