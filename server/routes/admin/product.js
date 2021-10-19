const express = require('express')
const db = require('../../db')
const utils = require('../../utils')
const multer = require('multer')
const upload =multer({dest:'images/'})
const fs = require('fs')

const router = express.Router()


// router.get('/', (request, response) => {
//     const statement = `select id, title, description, price, brandId, categoryId, imageFile 
//         from product`
//     db.query(statement, (error, data) => {
//       response.send(utils.createResult(error, data))
//     })
//   })

router.get('/', (request, response) => {
  const statement = `select product.*, category.title as categoryTitle, brand.title as brandTitle 
      from product 
        inner join brand on product.brandId = brand.id 
        inner join category on category.id = product.categoryId`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})
  
  router.get('/image/:filename', (request, response) => {
    const {filename} = request.params
    const path = __dirname + '/../../images/' + filename
    console.log(path)
    const data = fs.readFileSync(path)
    console.log(data)
    response.send(data)
  })

  router.post('/',upload.single('photo'), (request, response) => {
    const {title, description, categoryId, brandId, price} = request.body
    const statement = `insert into product (title, description, categoryId, brandId, price,imageFile) values (
      '${title}', '${description}', '${categoryId}', '${brandId}', '${price}','${request.file.filename}'
    )`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })


router.put('/:id', (request, response) => {
    const {id} = request.params
    const {title, description, categoryId, brandId, price} = request.body
    const statement = `update product 
      set title = '${title}', 
          description = '${description}',
          categoryId = '${categoryId}',
          brandId = '${brandId}',
          price = '${price}'
      where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
  
  router.delete('/:id', (request, response) => {
    const {id} = request.params
    const statement = `delete from product where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })
  
module.exports = router