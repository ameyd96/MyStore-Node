const express = require('express')
const db = require('../../db')
const utils = require('../../utils')
const multer = require('multer')
const upload =multer({dest:'images/'})
const fs = require('fs')

const router = express.Router()


router.get('/details/:id', (request, response) => {
  const {id} = request.params
  const statement = `
    select product.*, category.title as categoryTitle, brand.title as brandTitle 
    from product 
      inner join brand on product.brandId = brand.id 
      inner join category on category.id = product.categoryId
    where product.id = ${id}`
  db.query(statement, (error, products) => {

    // the products is an array
    // this is a where clause checking the id 
    // (whcich will return only one record..)
    response.send(utils.createResult(error, products[0]))
  })
})
router.get('/', (request, response) => {
  const statement = `
    select product.*, category.title as categoryTitle, brand.title as brandTitle 
    from product 
      inner join brand on product.brandId = brand.id 
      inner join category on category.id = product.categoryId`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.get('/search/:text', (request, response) => {
  const {text} = request.params
  const statement = `
    select product.*, category.title as categoryTitle, brand.title as brandTitle 
      from product 
        inner join brand on product.brandId = brand.id 
        inner join category on category.id = product.categoryId
    where title like '%${text}%' or description like '%${text}%'`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post('/filter', (request, response) => {
  const {categoryId, brandId} = request.body

  let categoryClause = ''
  let brandClause = ''

  // categoryId == 0: all categories
  // brandId == 0: all brands

  if (categoryId != 0) { categoryClause = ` product.categoryId = ${categoryId} ` }
  if (brandId != 0) { brandClause = ` product.brandId = ${brandId} ` }

  let whereClause = ''
  if ((categoryClause.length > 0) || (brandClause.length > 0)) {
    whereClause = categoryClause

    if (brandClause.length > 0) {
      // for anding the result of category and brand
      if (whereClause.length > 0) { whereClause += ' and ' }
      whereClause += brandClause
    }

    whereClause = ' where ' + whereClause
  } 

  const statement = `
    select product.*, category.title as categoryTitle, brand.title as brandTitle 
      from product 
        inner join brand on product.brandId = brand.id 
        inner join category on category.id = product.categoryId
    ${whereClause}`

  console.log(statement)

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// router.get('/', (request, response) => {
//   const statement = `select id, title, description, price, brandId, categoryId, imageFile 
//       from product`
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data))
//   })
// })
  
  router.get('/image/:filename', (request, response) => {
    const {filename} = request.params
    const path = __dirname + '/../../images/' + filename
    console.log(path)
    const data = fs.readFileSync(path)
    console.log(data)
    response.send(data)
  })

  
module.exports = router