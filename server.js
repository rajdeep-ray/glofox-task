const express = require('express')
const logger = require('morgan');
const cors = require('cors');

const { PrismaErrorHandler, Handle404, ErrorHandler } = require('./middlewares/errorHandler');

const indexRouter = require('./routes/index.route')
const classesRouter = require('./routes/classes.route');
const bookingRouter = require('./routes/booking.route');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter)
app.use('/classes', classesRouter)
app.use('/booking', bookingRouter)

app.use(Handle404);
app.use(PrismaErrorHandler)
app.use(ErrorHandler)

module.exports = app