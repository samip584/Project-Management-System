const express = require('express');

const router = express.Router();
const Employee = require('../model/employee');
const Project = require('../model/project');
const Task = require('../model/task');
const { response } = require('express');

router.get('/', function(req, res, next){
  //validate()
  if(req.user.role === 'admin'){
    Employee.getAll().
    then((emp_list) => {
      let response = {
        show_User : emp_list,
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
    }
    Project.getRestrictedProjects(req.user.id)
    .then((result =>{
      response.projects  = result.toJSON()
      res.json(response)
    }))
  }
   
})
module.exports = router;