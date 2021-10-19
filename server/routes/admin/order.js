const express = require('express')
const db = require('../../db')
const config = require('../../config')
const utils= require('../../utils')

const router = express.Router()
router.get('/', (request, response) => {
    const statement = `select * from userOrder`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
  
  router.put('/update-status/:id', (request, response) => {
    const {id} = request.params
    const {status} = request.body
  
    const statement = `update userOrder set orderState = ${status} where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
module.exports = router