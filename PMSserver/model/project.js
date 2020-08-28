const bookshelf = require('../config/db').bookshelf;

bookshelf.plugin( 'registry' );

const Project = bookshelf.model('Project',{
  tableName: 'projects',
  employees() {
    return this.belongsToMany('Employee','employee_projects', 'project_id', 'emp_id', 'project_id', 'emp_id')
  },
  tasks() {
    return this.hasMany('Task', 'project', 'project_id');
  },
  },{
  getAllProjects:  function(){
    return this.fetchAll({
      withRelated: ['tasks'],
      columns: ['project_id', 'title', 'description', 'project_manager'],
      require:false
    });
  },
  getRestrictedProjects:  function(id){
    return this.where({project_manager:id}).fetchAll({
      withRelated: ['tasks'],
      columns: ['project_id', 'title', 'description', 'project_manager'],
      require:false
    });
  },
  getProjectById:  function(id){
    return this.where({project_id:id}).fetch({
      columns: ['project_id', 'title', 'description', 'project_manager'],
      require:false
    });
  },
  
  updateProject:  function(id, title, description, project_manager ){
    return this.where({project_id:id}).save({
      title,
      description,
      project_manager
    },
    {
      patch: true
    });
  },
  addProject: function(title, description, project_manager){
    return this.forge({
      title,
      description,
      project_manager
    }).save()
  },
  deleteProject: function(id){
    return this.where({project_id:id}).destroy();
  },
  getProductEmployees: function(id){
    return  this.where('project_id', id).fetch({ withRelated: [{'employees': function(qb) {
      qb.column( 'employees.emp_id','emp_name', 'email', 'role');
    }}] });
  },
});

module.exports = Project;