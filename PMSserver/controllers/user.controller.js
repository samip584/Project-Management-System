const router = require('express').Router();

const hasher = require('../helpers/hasher');
const Employee = require('../model/employee');

const { body, validationResult } = require('express-validator');
const Task = require('../model/task');

router.get('/:id', function(req, res, next){
  Employee.getEmployeeById(req.params.id)
  .then((result) =>{
    res.json(result)
  })
  .catch((err) =>{
    next(err)
  })
})

router.get('/getall', function(req, res, next){
  Employee.getAll()
  .then((result) => {
    res.json(result)
  })
  .catch((err) =>{
    next(err)
  })
})

router.put('/:id', function(req, res, next){
  Employee.update(req.params.id, req.body.name, req.body.email, req.body.role)
  .then((result) => {
    res.json({
      user: 'User updated'
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.put('/:id/changepassword', [
  body('new_password').isLength({min:8}).withMessage('Password must be atleast 8 characters')
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('Password must contain one lowercase character, one uppercase character, one number and one special character')
  ], function(req, res, next){
  Employee.getEmployeePassword(req.params.id)
  .then((result) => {
    if(result.get('password') === hasher.sha512(req.body.old_password, result.get('salt')).passwordHash){
      let hashedPassword = hasher.HashPassword(req.body.new_password);
      Employee.changePassword(req.params.id, hashedPassword.hash, hashedPassword.salt)
      .then((result) => {
        res.json({
          msg: 'Password Changed'
        })
      })
      .catch((err) =>{
        next(err)
      })
    }else{
      next({
        err: 'Password incorrect'
      })
    }
  })
  .catch((err) =>{
    next(err)
  })
})

router.get('/:id/tasks', function(req, res, next){
  Task.getEmployeeTasks(req.params.id)
  .then((result) => {
    res.json({
      tasks: result,
    })
  })
  .catch((err) =>{
    next(err)
  })
})
router.get('/:id/projects', function(req, res, next){
  Employee.getEmployeesProduct(req.params.id)
  .then((result) =>{
    res.json(result)
  })
  .catch((err) =>{
    next(err)
  })
})


module.exports = router;