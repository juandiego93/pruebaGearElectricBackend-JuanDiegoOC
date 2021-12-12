const express = require('express');
const route = express.Router();
const controller = require('../controller/controller')

// Routes 
// API Asistentes
route.get('/asistentes', controller.find)
route.get('/asistentes/:id', controller.find)
route.delete('/asistentes/:id', controller.delete)
route.post('/asistentes', controller.create)
route.put('/asistentes/:id', controller.update)

// Get Models
route.get('/typeDocuments', controller.typeDocuments)

module.exports = route