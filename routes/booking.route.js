const express = require('express')
const { addBooking, listAllBookings } = require('../controllers/booking.ctrl')
const bookingRoute = express.Router()

bookingRoute.route('/')
    .get(listAllBookings)
    .post(addBooking)

module.exports = bookingRoute