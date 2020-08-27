const router = require('express').Router();

const authorize = require('../middlewares/authorize')
const Task = require('../model/task');
const Comment = require('../model/comment');
router.put('/:id', function(req, res, next){

  Task.updateTask(req.params.id, req.body.description, req.body.leader, req.body.project)
  .then((result) => {
    res.json({
      msg: 'task updated'
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.delete('/:id', function(req, res, next){
  Task.deleteTask(req.params.id)
  .then((result) => {
    res.json({
      msg: 'Task deleted'
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.post('/:id/addComment', function(req, res, next){
  Comment.addComment(req.body.comment, req.user.id, req.body.task)
  .then((result) => {
    res.json({
      msg: 'Comment Added'
    })
  })
  .catch((err) => {
    next(err)
  })  
})


router.get('/:id/comments', function(req, res, next){
  Comment.getCommentFromTask(req.params.id)
  .then((result) => {
    res.json(result)
  })
  .catch((err) => {
    next(err)
  })
})

  
module.exports = router;