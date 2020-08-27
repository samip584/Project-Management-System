const e = require("express");

module.exports = function(req, res, next){
  if (req.user.role === 'admin'){
    return next();
  } else{
    return next({
      msg: 'you dont have access',
      status: 401
    })
  }
 
} 