const express = require('express');

const jwt = require('../helpers/jwt');
const hasher = require('../helpers/hasher');

const router = express.Router();
const Employee = require('../model/employee');


router.post('/', function(req, res, next){
  //validate()
   Employee.getEmployeeByEmail(req.body.email)
  .then((result) => {
    let employee = result;

    if(employee.get('password') === hasher.sha512(req.body.password, employee.get('salt')).passwordHash){
      let data = {
        id: employee.get('emp_id'),
        role: employee.get('role')
      }
      let token = jwt.createToken(data);
      res.json({
        token
      })
    }else{
      next({
        err: 'Incorrect email or password'
      })
    }
  })
  .catch((err) => {
    next({
      err: 'Incorrect email or password'
    })
  })
})
module.exports = router;