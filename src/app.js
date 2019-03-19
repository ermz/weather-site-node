const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Edson Ramirez'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: "Edson Ramirez"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is a help message',
    title: 'Help',
    name: 'Edson Ramirez'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })


})

app.get('/products', (req, res) => {
  if (!req.query.search) {
      return res.send({
        error: 'You must provide a search term'
      })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404general', {
    message: 'Help article not found.',
    title: '404 HELP',
    name: 'Edson Ramirez'
  })
})

app.get('*', (req, res) => {
  res.render('404general', {
    message: 'Page not found',
    title: '404 ERROR',
    name: 'Edson Ramirez'
  })
})

app.listen(port, () => {
  console.log('Server is up in port ' + port)
})
