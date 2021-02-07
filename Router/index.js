const express = require('express')
const router = express.Router()

const teacher = require('./teacher')
const student = require('./student')
const subject = require('./subject')

router.get('/',(req,res)=>{
    res.send('hacktiv8 school app 1')
})

router.use('/teachers',teacher)
router.use('/students',student)
router.use('/subjects',subject)

module.exports = router