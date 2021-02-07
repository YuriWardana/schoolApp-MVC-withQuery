const pool =  require('../setup/connection')

class Teacher {
    constructor(id,first_name,last_name,email){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
    }
}

class TeacherModel{

    static read(cb){
        let query = `select * from "Teachers"`
        pool.query(query,(err,data)=>{
            if (err) {
                cb(err)
            } else {
                let result = []
                for (let i = 0; i < data.rows.length; i++) {
                    let id = data.rows[i].id
                    let first_name = data.rows[i].first_name
                    let last_name = data.rows[i].last_name
                    let email = data.rows[i].email
                    
                    let newdata =  new Teacher(id,first_name,last_name,email)
                    result.push(newdata)
                } 
                cb(null,result)
            }
        })
    }
}

module.exports = TeacherModel