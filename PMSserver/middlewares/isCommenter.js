const e = require("express");
Comment = require('../model/comment')
module.exports = function(req, res, next){
  Comment.getCommentById(req.params.id)
  .then((result) => {
    if (req.user.id === result.emp_id){
      return next();
    } else{
      return next({
        msg: 'you dont have access',
        status: 401
      })
    }
  })
  .catch(() =>{
    next({
      msg: 'something is wrong with the token',
      status: 401
    })
  })
} 