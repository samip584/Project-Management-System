const bookshelf = require('../config/db').bookshelf;


bookshelf.plugin( 'registry' );
const Task = bookshelf.model('Task',{
  tableName: 'tasks',
  },{
    addTask: function(title, description, assignee, project, deadline){
      return this.forge({
        title,
        description,
        assignee,
        project,
        deadline
      }).save()
    },
    getAllTasks:  function(id){
      return this.where({project:id}).fetchAll({
        columns: ['task_id', 'title', 'description', 'assignee', 'project', 'deadline'],
        require:false
      });
    },
    getEmployeeTasks: function(emp_id){
      return this.where({asignee: emp_id}).fetchAll({
        columns: ['task_id', 'title', 'description', 'assignee', 'project', 'deadline'],
        require:false
      })
    },
    getTaskById:  function(id){
      return this.where({task_id:id}).fetch({
        columns: ['task_id', 'title', 'description', 'assignee', 'project', 'deadline'],
        require:false
      });
    },
    updateTask:  function(id, title, description, assignee, project, deadline ){
      return this.where({task_id:id}).save({
        title,
        description,
        assignee, 
        project,
        deadline
      },
      {
        patch: true
      });
    },
    deleteTask: function(id){
      return this.where({task_id:id}).destroy();
    }
});

module.exports = Task;