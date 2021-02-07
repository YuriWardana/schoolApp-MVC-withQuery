const express = require('express')
const router = express.Router()
const StudentController = require('../controllers/StudentController')



router.get('/', StudentController.read)

router.get('/add', StudentController.addForm)

router.post('/add', StudentController.addData)

router.get('/:id/edit',StudentController.editForm)

router.post('/:id/edit',StudentController.editStudent)

router.get('/:id/delete',StudentController.deleteStudent)


module.exports = router