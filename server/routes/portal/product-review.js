const express = require('express')
const db = require('../../db')
const utils = require('../../utils')
const fs = require('fs')

const router = express.Router()

router.get('/:id', (request, response) => {
  const {id} = request.params

  const statement = `select * from  productReviews where productId = ${id}`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post('/:id', (request, response) => {
  const {id} = request.params
  const {review, rating} = request.body

  const statement = `insert into productReviews (productId, userId, rating, review) values (
    ${id}, ${request.userId}, ${rating}, '${review}'
  )`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
  
})

module.exports = router