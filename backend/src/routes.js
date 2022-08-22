//modules
const express = require('express');
const multer = require('multer');
//files
const routes = express.Router();
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashBoardController = require('./controllers/DashBoardController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');
//instances
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

routes.get('/status', (req, res) => { //req- request, res-response
    res.send({status:200}); //resposta json para mostrar que esta tudo ok 
})

// Registration
routes.post('/registration/:eventId', RegistrationController.create);
routes.get('/registration/:registration_id', RegistrationController.getRegistrationById);
routes.post('/registration/:registration_id/approval', ApprovalController.approval);
routes.post('/registration/:registration_id/rejection', RejectionController.rejection);


//Login
routes.post('/login', LoginController.store);

//Dashboard
routes.get('/dashboard/:eventId', DashBoardController.getEventById);
routes.get('/dashboard', DashBoardController.getAllEvents);
routes.get('/dashboard/:sport', DashBoardController.getEventsBySport);

//Events
routes.post('/event', upload.single("thumbnail"), EventController.createEvent); //upload.single apanha o ficheiro do request e cria-o no disco
routes.delete('/event/:eventId', EventController.deleteEvent);

//User
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);
routes.get('/user', UserController.getAllUsers);

module.exports = routes;