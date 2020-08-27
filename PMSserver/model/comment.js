const bookshelf = require('../config/db').bookshelf;

bookshelf.plugin( 'registry' );

const Comment = bookshelf.model('Comment',{
  tableName: 'comments',
  },{
  getCommentById: function(id){
    return this.where({comment_id:id}).fetch({
      columns: ['comment_id', 'comment', 'commenter', 'task'],
      require:false,
    });
  },
  addComment: function(comment, commenter, task){
    return this.forge({
      comment,
      commenter,
      task
    }).save()
  },
  getCommentFromTask: function(task_id){
    return this.where({task:task_id}).fetchAll({
      columns: ['comment_id', 'comment', 'commenter', 'task'],
      require:false,
    });
  },
  updateComment: function(id, comment){
    return this.where({task_id:id}).save({
      comment
    },
    {
      patch: true
    });
  },
  deleteComment: function(id){
    return this.where({comment_id:id}).distroy();
  }
});

module.exports = Comment;