const pool = require('./connection')

let tableTeacher = `
  CREATE TABLE IF NOT EXISTS "Teachers" (
    id serial PRIMARY KEY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT  NULL,
    gender VARCHAR (50) NOT NULL
  )`

let tableStudent = `
CREATE TABLE IF NOT EXISTS "Students" (
  id serial PRIMARY KEY,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR (50) NOT NULL,
  email VARCHAR (50) NOT NULL,
  gender VARCHAR (50) NOT NULL,
  birthdate VARCHAR (50) NOT NULL
)
`
let tableSubject = `
  CREATE TABLE IF NOT EXISTS "Subjects" (
    id serial PRIMARY KEY,
    subject_name VARCHAR NOT NULL
  )`

pool.query(tableTeacher,(err,data)=>{
    if (err) {
        console.log(err);
    } else {
        pool.query(tableStudent,(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                pool.query(tableSubject,(err,data)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`setup table oke`);
                    }
                    pool.end()
                })
                
            }
        })
    }
})