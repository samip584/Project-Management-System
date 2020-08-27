const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const hasher = require('../helpers/hasher')
const Employee = require('../model/employee');


router.post('/',[
  body('email').isEmail(),
  body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters')
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('Password must contain one lowercase character, one uppercase character, one number and one special character')
], function(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ err: errors.array() });
  }
  let hashedPassword = hasher.HashPassword(req.body.password);
  Employee.addUser(req.body.name, hashedPassword.hash, hashedPassword.salt, req.body.email, req.body.role)
  .then(() => {
    res.json({
      msg : 'employee added'
    })
  })
  .catch((msg) => {
    next({msg})
  })
}
)

module.exports = router;