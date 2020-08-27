const bookshelf = require('../config/db').bookshelf;

bookshelf.plugin( 'registry' );
require('./project')
require('./employeeProject')

const Employee = bookshelf.model('Employee',{
  tableName: 'employees',
  projects: function () {
    return this.belongsToMany('Project', 'employee_projects', 'emp_id', 'project_id', 'emp_id', 'project_id')
  },
  },{

  getEmployeeByEmail: function(email){
    return this.where({email:email}).fetch({
      columns: ['emp_id', 'role', 'emp_name', 'salt', 'password'],
      require:false,
    });
  },
  getEmployeeById: function(id){
    return this.where({emp_id:id}).fetch({
      columns: ['emp_id', 'emp_name', 'email', 'role'],
      require:false,
    });
  },
  addUser: function(name, hash, salt, email, role){
    return this.forge({
      emp_name: name,
      password: hash,
      salt: salt,
      email: email,
      role: role,
    }).save()
  },
  getAll: function(){
    return this.fetchAll({
      columns: ['emp_id', 'emp_name', 'email', 'role'],
      require:false,
    });
  },
  update: function(id, name, email, role){
    return this.where({emp_id:id}).save({
      emp_name: name, 
      email,
      role
    },
    {
      patch: true
    });
  },
  changePassword: function(id, password, salt){
    return this.where({emp_id:id}).save({
      password, 
      salt
    },
    {
      patch: true
    });
  },
  getEmployeePassword: function(id){
    return this.where({emp_id:id}).fetch({
      columns: ['password', 'salt'],
      require:false,
    });
  },
  getEmployeesProduct: function(id){
    return  this.where('emp_id', id).fetch({ withRelated: ['projects'],
      columns: ['emp_id', 'emp_name', 'email', 'role'],
      require:false,
    });
  },

});

module.exports = Employee;