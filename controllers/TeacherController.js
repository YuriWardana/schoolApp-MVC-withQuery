const TeacherModel = require('../models/TeacherModel')

class TeacherController{

    static read(req,res){
        TeacherModel.read((err,data)=>{
            if (err) {
                res.send(err)
            } else {
                res.render('teacher/teacherIndex',{data:data})
            }
        }) 
    }
}

module.exports = TeacherController