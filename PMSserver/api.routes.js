const userRoute = require('./controllers/user.controller');
const taskRoute = require('./controllers/task.controller');
const loginRoute = require('./controllers/login.controller');
const projectRoute = require('./controllers/project.controller');
const commentRoute = require('./controllers/comment.controller');
const registerRoute = require('./controllers/register.controller');
const registerDashBoard = require('./controllers/dashBoard.controller');


const isAdmin = require('./middlewares/isAdmin')
const authenticate = require('./middlewares/authenticate')

const router = require('express').Router();

router.use('/login', loginRoute);
router.use('/task',authenticate, taskRoute);
router.use('/user', authenticate, userRoute);
router.use('/project', authenticate, projectRoute);
router.use('/comment',authenticate, isAdmin, commentRoute);
router.use('/register',authenticate, isAdmin, registerRoute);
router.use('/dashboard',authenticate, registerDashBoard);

module.exports = router;

