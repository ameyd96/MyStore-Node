const express = require('express')
const db = require('../../db')
const config = require('../../config')
const utils = require('../../utils')

const router = express.Router()

// router.get('/',(request,response)=>{
//     const statement = `select * from cart where userId='${request.userId}'`
//     db.query(statement,(error,data)=>{
//         response.send(utils.createResult(error,data))
//     })
// })

router.get('/', (request, response) => {
  const statement = `
      select cart.*, product.imageFile, product.title, product.description from cart 
        inner join product on cart.productId = product.id
      where userId = ${request.userId}`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})
router.post('/', (request, response) => {
    const {productId, price, quantity} = request.body
    const statement = `insert into cart (userId, productId, price, quantity) values (
      ${request.userId}, ${productId}, ${price}, ${quantity}
    )`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  router.put('/:id', (request, response) => {
    const {id} = request.params
    const {quantity} = request.body
    const statement = `update cart set
        quantity =  ${quantity}
      where id = ${id}
      `
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  router.delete('/:id', (request, response) => {
    const {id} = request.params
    const statement = `delete from cart where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

module.exports=router