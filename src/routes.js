//modules
const express = require('express');
const multer = require('multer');
//files
const routes = express.Router();
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
//instances
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

routes.get('/status', (req, res) => { //req- request, res-response
    res.send({status:200}); //resposta json para mostrar que esta tudo ok 
})

//Event
routes.post('/event', upload.single("thumbnail"), EventController.createEvent); //upload.single apanha o ficheiro do request e cria-o no disco
routes.get('/event/:eventId', EventController.getEventById);

//User
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes;