const express = require('express')
const db = require('../../db')
const config = require('../../config')
const utils = require('../../utils')

const router = express.Router()


router.get('/', (request, response) => {
    const statement = `select id, title, description from brand`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
  
  router.post('/', (request, response) => {
    const {title, description} = request.body
    const statement = `insert into brand (title, description) values (
      '${title}', '${description}'
    )`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
  
  router.put('/:id', (request, response) => {
    const {id} = request.params
    const {title, description} = request.body
    const statement = `update brand set title = '${title}', description = '${description}' 
      where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
  
  router.delete('/:id', (request, response) => {
    const {id} = request.params
    const statement = `delete from brand where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
  
  
  
module.exports = router