const express = require('express')
const router = express.Router()
const TeacherController = require('../controllers/TeacherController')

router.get('/', TeacherController.read)

router.get('/',(req,res)=>{
    fs.readFile('./teachers.json','utf8',(err,data)=>{
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(data)
            // res.send(data)
            res.render('teacher/teacherIndex',{data:data})
        }
    })
})

router.get('/:id',(req,res)=>{
    fs.readFile('./teachers.json','utf8',(err,data)=>{
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