
const express = require('express'); 

const { BookingController } = require('../../controllers');
const { BookingsMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post(
    '/',
    BookingsMiddlewares.validateCreateBookingRequest,
    BookingController.createBooking
)

router.post(
    '/payments',
    BookingController.makePayment
)

module.exports = router;