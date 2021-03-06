const express = require('express')
const db = require('../../db')
const config = require('../../config')
const utils = require('../../utils')

const router = express.Router()


router.get('/', (request, response) => {
    const statement = `select id, title, description from category`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
  
  
module.exports = router