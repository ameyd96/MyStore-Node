const express = require('express')
const db = require('../../db')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const utils = require('../../utils')

const router = express.Router()

router.post('/signin', (request, response) => {
  const {email, password} = request.body

  const encryptedPassword = crypto.SHA256(password)
  const statement = `select id, firstName, lastName, phone, status from user where email = '${email}' and password = '${encryptedPassword}'`
  db.query(statement, (error, users) => {
    const result = {}
    if (error) {
      result['status'] = 'error'
      result['error'] = error
    } else {
      if (users.length == 0) {
        result['status'] = 'error'
        result['error'] = 'invalid email or password'
      } else {
        const user = users[0]
        if (user['status'] == 0) {
         
          result['status'] = 'error'
          result['error'] = 'please activate your account'
        } else if (user['status'] == 2) {
          
          result['status'] = 'error'
          result['error'] = 'your account is suspended, please contact <admin@mystore.com>'
        } else if (user['status'] == 1) {
          const token = jwt.sign({id: user['id']}, config.secret)
          result['status'] = 'success'
          result['data'] = {
            firstName: user['firstName'],
            lastName: user['lastName'],
            phone: user['phone'],
            token: token
          }
        }
      }
    }

    response.send(result)
  })
})

router.post('/signup', (request, response) => {
  const {firstName, lastName, phone, email, password} = request.body

  const encryptedPassword = crypto.SHA256(password)
  const statement = `insert into user (firstName, lastName, phone, email, password) values (
    '${firstName}', '${lastName}', '${phone}', '${email}', '${encryptedPassword}'
  )`
  db.query(statement, (error, users) => {
    response.send(utils.createResult(error, users))
  })
})

module.exports = router