const pool = require('../setup/connection')

class Student{
    constructor(id,first_name,last_name,email,gender,birthdate){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
        this.birthdate = birthdate

    }
} 

class StudentModel{

    static read(cb){
        let query = `select * from "Students"`

        pool.query(query,(err,data)=>{
            if (err) {
                cb(err)
            }else{
                
                let result = []
                for (let i = 0; i < data.rows.length; i++) {
                    let id = data.rows[i].id
                    let first_name = data.rows[i].first_name
                    let last_name = data.rows[i].last_name
                    let email = data.rows[i].email
                    let gender = data.rows[i].gender
                    let birthdate = data.rows[i].birthdate 
                    
                    let newData = new Student(id,first_name,last_name,email,gender,birthdate)
                    result.push(newData) 
                }
                    cb(null,result) 
            }
        })
    }

    static addData(data,cb){
        let alert = this.validation(data) 

        if(alert.length > 0){
            cb(alert)
        }else{
            let {first_name, last_name,email,gender,birthdate} = data
            let query = `
            insert into "Students" ("first_name" , "last_name", "email", "gender", "birthdate")
            values ($1,$2,$3,$4,$5) returning *`
            
            let values = [first_name, last_name,email,gender,birthdate]
            
            pool.query(query,values,(err,data)=>{
                if (err) {
                    cb(err)
                } else {
                    let id = data.rows[0].id
                    let first_name = data.rows[0].first_name
                    let last_name = data.rows[0].last_name
                    let email = data.rows[0].email
                    let gender = data.rows[0].gender
                    let birthdate = data.rows[0].birthdate
                    
                    let result = new Student(id,first_name, last_name,email,gender,birthdate)
                    
                    cb(null,result)
                }
            })
        }
    }
        
    static getId(id,cb){
       
        let query = `select * from "Students" where id = $1`
        let values = [id]

        pool.query(query,values,(err,data)=>{
            if (err) {
                cb(err)
            } else {
                let id = data.rows[0].id
                let first_name = data.rows[0].first_name
                let last_name = data.rows[0].last_name
                let email = data.rows[0].email
                let gender = data.rows[0].gender
                let birthdate = data.rows[0].birthdate
                
                let result = new Student(id,first_name, last_name,email,gender,birthdate)
                console.log(result);
                cb(null,result)
            }
        })
    }

    static editStudent(id,data,cb){
        let alert = this.validation(data)
        if (alert.length> 0) {
            cb(alert)
        } else {
            
            let {first_name, last_name,email,gender,birthdate} = data
            
            let query = `
            update "Students" 
            set ("first_name" , "last_name", "email", "gender", "birthdate") = ($1,$2,$3,$4,$5)
            where id = ${id}`
            
            let values = [first_name, last_name,email,gender,birthdate]
            
            pool.query(query,values,(err,data)=>{
                if (err) {
                    cb(err)
                } else {
                    cb(null,data)   
                }
            })
        }
    }

    static deleteStudent(id,cb){

        let query = `delete from "Students" where id = ${id}`
        
        pool.query(query,(err,data)=>{
            if (err) {
                cb(err)
            } else {
                cb(null,data)
            }
        })
    }

    static validation(data){
        let errors = []

        if(!data.first_name){
            errors.push(`First name must be filled`)
        }

        if(!data.last_name){
            errors.push(`last name must be filled`)
        }
        if(!data.email){
            errors.push(`Email must be filled`)
        }

        if(!data.gender){
            errors.push(`gender must be filled`)
        }

        if(!data.birthdate){
            errors.push(`Birthdate must be filled`)
        }

        return errors
    }
}

module.exports = StudentModel