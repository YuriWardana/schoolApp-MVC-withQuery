const pool = require('../setup/connection')
const fs = require('fs')

let dataTeacher = JSON.parse(fs.readFileSync('./teachers.json','utf8'))
let queryTeacher = `insert into "Teachers" ("first_name","last_name","email","gender") values`

for (let i = 0; i < dataTeacher.length; i++) {
    let first_name = dataTeacher[i].first_name
    let last_name = dataTeacher[i].last_name
    let email = dataTeacher[i].email
    let gender = dataTeacher[i].gender
    
    if(i === dataTeacher.length-1){
        queryTeacher += `('${first_name}','${last_name}','${email}','${gender}');` 
    }else{
        queryTeacher += `('${first_name}','${last_name}','${email}','${gender}'),`
    }
    
}
console.log(queryTeacher);
let dataStudent = JSON.parse(fs.readFileSync('./students.json','utf8'))
let queryStudent = `insert into "Students" ("first_name","last_name","email","gender","birthdate") values`


for (let i = 0; i < dataStudent.length; i++) {
    let first_name = dataStudent[i].first_name
    let last_name = dataStudent[i].last_name
    let email = dataStudent[i].email
    let gender = dataStudent[i].gender
    let birthdate = dataStudent[i].birthdate
    
    if(i === dataStudent.length-1){
        queryStudent += `('${first_name}','${last_name}','${email}','${gender}','${birthdate}');` 
    }else{
        queryStudent += `('${first_name}','${last_name}','${email}','${gender}','${birthdate}'),`
    }
    
}

let dataSubject = JSON.parse(fs.readFileSync('./subjects.json','utf8'))
console.log(dataSubject);
let querySubject = `insert into "Subjects" ("subject_name") values`

for (let i = 0; i < dataSubject.length; i++) {
    let subject_name = dataSubject[i].subject_name
   

    if(i === dataSubject.length-1){
        querySubject += `('${subject_name}');` 
    }else{
        querySubject += `('${subject_name}'),`
    }
    
}

pool.query(queryTeacher,(err,data)=>{
    if (err) {
        console.log(err);
        console.log(`1`);
    }else{
        pool.query(queryStudent,(err,data)=>{
            if (err) {
                console.log(err);
                console.log(`2`);
            }else{
                pool.query(querySubject,(err,data)=>{
                    if (err) {
                        console.log(err);
                        console.log(`3`);
                    } else {
                        console.log('seeding berhasil');
                    }
                    pool.end()
                })
            }
        })
    }
})


