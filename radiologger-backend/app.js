var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var showsRouter = require('./routes/show')
var languageRouter = require('./routes/language')
var sourcedstinationRouter = require('./routes/sourcedestination')
var stationRouter = require('./routes/station')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

var mariadb = require('mariadb')
//Database connection
app.use(function(req, res, next){
  res.locals.pool = mariadb.createPool({
    host: 'localhost', 
    user:'root', 
    password: 'lucien',
    connectionLimit: 5,
    database: 'radiologger'
  })
	next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/shows', showsRouter)
app.use('/languages', languageRouter)
app.use('/sourcedestinations', sourcedstinationRouter)
app.use('/stations', stationRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
