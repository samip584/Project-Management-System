const bookshelf = require('../config/db').bookshelf;

bookshelf.plugin( 'registry' );
const taskTags = bookshelf.model('taskTags',{
  tableName: 'task_tags',
  },{
  addTagsinTask: function(tags){
    return this.forge(tags).save()
  },
  deletetag: function(task_id, emp_id){
    return this.where({employee:emp_id, task:task_id}).distroy();
  }
});

module.exports = taskTags;