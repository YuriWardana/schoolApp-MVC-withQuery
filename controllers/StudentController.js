const StudentModel = require('../models/StudentModel')

class StudentController{
    static read(req,res){
        StudentModel.read((err,data)=>{
            if (err) { 
                res.send(err)
            } else {
                res.render('student/studentIndex',{data:data} )
            }
        })  
        
        
    }

    static addForm(req,res){
        let alert = req.query.alert
            res.render('student/add',{alert})
            
        
    }

    static addData(req,res){
        let inputs = req.body
        StudentModel.addData(inputs,(err,data)=>{
            if (err) {
                if(Array.isArray(err)){
                    res.redirect(`/students/add?alert= ${err}`)
                }else{
                    res.send(err)
                }
            } else {
                res.redirect('/students')  
            }
        }) 
    }
 
    static editForm(req,res){
        let {id} = req.params
        StudentModel.getId(id,(err,data)=>{
            if (err) {
                let alert = req.query.alert
                if (alert) {
                    res.redirect('student/edit',{alert})
                } else {
                    res.send(err)
                }
                res.send(err);
            } else {
                res.render('student/edit',{data:data})
            }
        })
    }

    static editStudent(req,res){
        let {id} = req.params
        let input = req.body
        StudentModel.editStudent(id,input,(err,data)=>{
            if (err) {
                // if (Array.isArray(err)) {
                //     res.redirect(`/students/${id}/edit?alert = ${err}`)  
                // } else {
                   res.send(err)
                // }
            } else {
               res.redirect('/students') 
            }
        })
    }

    static deleteStudent(req,res){
        let {id} = req.params
        StudentModel.deleteStudent(id,(err,data)=>{
            if (err) {
                res.send(err)
            } else {
              res.redirect('/students') 
            }
        }) 
    }
}

module.exports = StudentController