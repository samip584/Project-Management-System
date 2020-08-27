const bookshelf = require('../config/db').bookshelf;
bookshelf.plugin( 'registry' );

require('./project')
require('./employee')

const employeeProject = bookshelf.model('EmployeeProject',{
  tableName: 'employee_projects',
  },{
  addEmployeesinProject: function(employees){
    console.log(employees)
    return this.collection().add(employees).invokeThen('save');
  },
 
  removeEmployeefromProject: function(project_id, emp_id){
    return this.where({employee:emp_id, project:project_id}).distroy();
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
  }
});

module.exports = employeeProject;