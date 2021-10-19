const express = require('express')
const db = require('../../db')
const config = require('../../config')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/signin',(request,response)=>{
    const {email,password}=request.body
    const encryptedPassword=crypto.SHA256(password)
    const statement = `select id, firstName, lastName, phone from admins where email='${email}' and '${encryptedPassword}'`
    db.query(statement,(error,users)=>{
        const result={}
        if (error) {
            result['status'] = 'error'
            result['error'] = error
          } else {
            if (users.length == 0) {
              result['status'] = 'error'
              result['error'] = 'invalid email or password'
            } else {
              const user = users[0]
              //const token = jwt.sign({id: user['id']}, config.secret)
              const token=jwt.sign({id:user['id']},config.secret)
              result['status'] = 'success'
              result['data']=user
              result['data'] = {
                firstName: user['firstName'],
                lastName: user['lastName'],
                token: token
              }
            }
          }
      response.send(result)
    })
    

})
module.exports = router