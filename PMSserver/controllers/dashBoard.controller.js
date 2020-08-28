const express = require('express');

const router = express.Router();
const Employee = require('../model/employee');
const Project = require('../model/project');
const Task = require('../model/task');
const { response } = require('express');
const EmployeeProject = require('../model/employeeProject');

router.get('/', function(req, res, next){
  //validate()
  if(req.user.role === 'admin'){
    Employee.getAll().
    then((emp_list) => {
      let response = {
        show_User : emp_list,
        can_alter : 'all'
      }
      Project.getAllProjects()
      .then((result =>{
        response.projects  = result.toJSON()
        res.json(response)
      }))
    }) 
  }

  else if(req.user.role === 'project manager'){
    console.log(req.user.id)
    let response = {
      show_User :false,
      can_alter : 'assigned'
    }
    Project.getAllProjects(req.user.id)
    .then((result =>{
      
      response.projects  = result.toJSON()
      res.json(response)
    }))
  }
  else if(req.user.role === 'team lead' || req.user.role === 'engineer'){
    let response = {
      show_User :false,
      can_alter : false,
      projects :[],
    }
    EmployeeProject.getEmployeesProjects(req.user.id)
    .then((result) => {
      result = result.toJSON();
      let project_id_list = [];
      result.forEach(project =>{
        project_id_list.push(project.project_id)
      })
      Project.getProjectsInList(project_id_list)
      .then((result) => {
        response.projects = result.toJSON()
        res.json(response)
      })
      
    })
  }
   
})
module.exports = router;