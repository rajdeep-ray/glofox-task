const express = require('express')
const { addClasses, listAllClasses } = require('../controllers/classes.ctrl')
const classesRoute = express.Router()

classesRoute.route('/')
    .get(listAllClasses)
    .post(addClasses)

module.exports = classesRoute