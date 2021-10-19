const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const utils = require('./utils')
const jwt = require('jsonwebtoken')
const config = require('./config')
const morgan = require('morgan')

// routers
const routeUser = require('./routes/portal/user')
const routeProduct = require('./routes/portal/product')
const routeCategory = require('./routes/portal/category')
const routeBrand = require('./routes/portal/brand')
const routeCart = require('./routes/portal/cart')
const routeAddress = require('./routes/portal/address')
const routeOrder = require('./routes/portal/order')
const routeProductReview = require('./routes/portal/product-review')


const app = express()

// for json type data
app.use(bodyParser.json())

// for url encoded type data (image in the product)
app.use(bodyParser.urlencoded())

app.use(cors('*'))
app.use(morgan('combined'))

// middleware to check if the request has received with 
// a valid and verified token
// scenario 1: token is missing: send 401
// scenario 2: token is invalid: send 401
// scenario 3: token is valid and verified: call the next()
function authorizeUser(request, response, next) {
  // token will not be available for signin, signup and activate urls
  if (
      (request.url == '/user/signin') || 
      (request.url == '/user/signup') || 
      (request.url.startsWith('/user/image')) ||
      (request.url.startsWith('/product/image')) 
    ) {
    // no token is required for these APIs
    next()
  } else {

    // all these APIs require the token
    const token = request.headers['token']
    if (!token) {
      
      // do not call next() as the user id is missing

      // token is missing
      response.status(401)
      response.send(utils.createResult('token is missing'))
    } else {
      
      // token is sent in the headers
      try {
        // verify the token and get the id
        const data = jwt.verify(token, config.secret)

        // add the user id in the request object
        // so that we can share this in all the APIs
        request.userId = data.id

        // go to the next function
        next()

      } catch(ex) {

        // do not call next() as the user id is missing
        response.status(401)
        response.send(utils.createResult('invalid token'))
      }
    }
  }
}

app.use(authorizeUser)

// add routes
app.use('/user', routeUser)
app.use('/product',routeProduct)
app.use('/category',routeCategory)
app.use('/brand',routeBrand)
app.use('/cart', routeCart)
app.use('/address', routeAddress)
app.use('/order', routeOrder)
app.use('/product-review', routeProductReview)

app.listen(4100, '0.0.0.0', () => {
  console.log('server started on port 4100')
})