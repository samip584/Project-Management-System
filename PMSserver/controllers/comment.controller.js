const router = require('express').Router();

const Comment = require('../model/comment');
router.put('/:id', function(req, res, next){
  Comment.updateComment(req.params.id, req.comment)
  .then((result) => {
    res.json({
      msg: 'Comment updated'
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.delete('/:id', function(req, res, next){
  Comment.deleteComment(req.params.id)
  .then((result) => {
    res.json({
      msg: 'Comment deleted'
    })
  })
  .catch((err) =>{
    next(err)
  })
})

  
module.exports = router;