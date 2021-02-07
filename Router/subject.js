const express = require('express')
const router = express.Router()
const fs = require('fs')
// const SubjectController = require('../controllers/SubjectController')

//  router.get('/',SubjectController.read) //error


router.get('/',(req,res)=>{
    fs.readFile('subjects.json','utf8',(err,data)=>{
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(data)
            res.render('subject/subjectIndex',{data:data})
        }
    })
})

router.get('/:id',(req,res)=>{
    fs.readFile('./subjects.json','utf8',(err,data)=>{
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(data)
            let id = Number(req.params.id)
            for (let i = 0; i < data.length; i++) {
                if(data[i].id === id){
                    res.send(data[i])
                }
                
            }
        }
    })
})

module.exports = router