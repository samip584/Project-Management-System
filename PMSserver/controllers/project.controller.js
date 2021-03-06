const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const Project = require('../model/project');
const Task = require('../model/task');
const Employee = require('../model/employee');
const EmployeeProject  = require('../model/employeeProject')

router.get('/getall', function(req, res, next){
  //validate()
  Project.getAllProjects()
  .then((result) => {
    res.json(result)
  })
  .catch((err) => {
    next(err)
  })
})

router.get('/:id', function(req, res, next){
  //validate()
  if(req.user.role === 'admin'){
    
    let response = {
      can_alter:true
    }
    Project.getProjectById(req.params.id)
    .then((result =>{
      response.project  = result.toJSON()
      res.json(response)
    }))
  }

  else if(req.user.role === 'project manager'){
    let response = {
      can_alter: false
    }
    Project.getProjectById(req.params.id)
    .then((result =>{
      if (result.project_manager === req.user.id){
        response.can_alter = true
      }
      response.project  = result.toJSON()
      res.json(response)
    }))
  }
  else if(req.user.role === 'team lead' || req.user.role === 'engineer'){
    let response = {
      can_alter: false
    }
    Project.getProjectById(req.params.id)
    .then((result =>{
      response.project  = result.toJSON()
      res.json(response)
    }))
  }
})



router.put('/:id', function(req, res, next){
  //validate()
  Project.updateProject(req.params.id, req.body.title, req.body.description, req.body.project_manager)
  .then((result) => {
    res.json(result)
  })
  .catch((err) => {
    next(err)
  })
})

router.post('/', function(req, res, next){
  Employee.getEmployeeByEmail(req.body.project_manager)
  .then((result) => {
    if(result.get('role') === 'project manager'){
      Project.addProject(req.body.title, req.body.description, result.get('emp_id'))
      .then((result) => {
        res.json({
          msg: 'Project Added'
        })
      })
      .catch((err) => {
        next(err)
      })  
    }
    else{
        next({
          msg: result.get('role') + ' was selected instead of Project Maneger'
        })
    }
  })
  .catch((err) => {
    next(err)
  })  
})

router.delete('/:id', function(req, res, next){
  Project.deleteProject(req.params.id)
  .then((result) => {
    res.json({
      msg: 'Project deleted'
    })
  })
  .catch((err) =>{
    next(err)
  })
})
  
router.post('/:id/addTask', function(req, res, next){
  Employee.getEmployeeByEmail(req.body.assignee)
  .then((result) => {
    EmployeeProject.inProject(result.get('emp_id'), req.params.id)
    .then(count => {
      if(count>0){
        isInProject = true;
      }
      else{
        isInProject = false;
      }
      if(result.get('role') === 'team lead' || result.get('role') === 'engineer' && isInProject){
        Task.addTask(req.body.title, req.body.description, result.get('emp_id'), req.params.id, req.body.deadline)
        .then((result) => {
          res.json({
            msg: 'Task Added'
          })
        })
        .catch((err) => {
          next(err)
        })
      }else{
        next({
          msg: result.get('role') + ' can not be assigned'
        })
      }
    })
    .catch((err) => {
      next(err)
    })
  })
})
  
router.get('/:id/tasks', function(req, res, next){
  Task.getAllTasks(req.params.id)
  .then((result) => {
    res.json(result)
  })
  .catch((err) => {
    next(err)
  })
})

router.post('/:id/addUsers', function(req, res, next){
  projectRelation = []
  req.body.employees.forEach(employee => {
    projectRelation.push({employee, project: req.params.id})    
  });
  EmployeeProject.addEmployeesinProject(projectRelation)
  .then((result) => {
    res.json({
      msg:'employees added'
    })
  })  
  .catch((err) => {
    next(err)
  })
})

router.post('/:id/addUser', function(req, res, next){
  Employee.getEmployeeByEmail(req.body.email)
  .then((result) => {
    EmployeeProject.addEmployeeinProject(result.get('emp_id'), req.params.id)
    .then((result) => {
      res.json({
        msg:'employees added'
      })
    })  
    .catch((err) => {
      next(err)
    })
  })
  .catch((err) => {
    next(err)
  })
  
})

router.get('/:id/getusers', function(req, res, next){
  Project.getProductEmployees(req.params.id)
  .then((result) => {
    res.json(result)
  })
  .catch((err) =>{
    next(err)
  })
})
module.exports = router;