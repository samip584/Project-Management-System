const bookshelf = require('../config/db').bookshelf;
bookshelf.plugin( 'registry' );

require('./project')
require('./employee')

const employeeProject = bookshelf.model('EmployeeProject',{
  tableName: 'employee_projects',
  projects() {
    return this.belongsTo('Project', 'project_id', 'project_id');
  },
  },{
  addEmployeeinProject: function(emp_id, project_id ){
    return this.forge({
      emp_id,
      project_id
    }).save()
  },

  addEmployeesinProject: function(employees){
    return this.collection().add(employees).invokeThen('save');
  },
  removeEmployeefromProject: function(project_id, emp_id){
    return this.where({emp_id:emp_id, project_id:project_id}).distroy();
  },

  AllEmployeeInProject: function(project_id){
    return this.belongsTo(Employee);
    // return this.where({project: project_id}).fetchAll({
    //   columns: ['employee']
    // }).then((result) => {
    //   result.for
    //   return Employee.query(function(db){
    //     db.where('emp_id', 'in', [26, 25])
    //   }).fetchAll()
    // })
  },
  inProject: function(emp_id, project_id){
    this.where({emp_id:emp_id, project_id:project_id}).count().then(count => {
      if(count>0){
        return true;
      }
      else{
        return false;
      }
    })
    
  },
  getEmployeesProjects(emp_id){
   
    return this.where({emp_id: emp_id}).fetchAll()
  }
});

module.exports = employeeProject;