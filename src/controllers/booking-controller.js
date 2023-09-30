const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services')
const { SuccessResponse, ErrorResponse } = require("../utils/common");

let in_memoDb = {};
async function createBooking(req, res) {
    try {
      const response = await BookingService.createBooking({
        flightId : req.body.flightId,
        userId: req.body.userId,
        noOfSeats : req.body.noOfSeats,
      });
      SuccessResponse.data = response;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      console.log("error in controller",error);
      ErrorResponse.error = error;
      return res.status(error.statusCode?error.statusCode:StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
async function makePayment(req, res) {
    try {
      const idempotencyKey = req.headers['x-idempotency-key'];
      console.log('headers : ',req.headers);
      if(!idempotencyKey){
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({message:'idempotency key missing'});
      }
      if(in_memoDb[idempotencyKey])
      {
        console.log('start idem');
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({message:'Cannot retry on a successful payment'});
      }
      const response = await BookingService.makePayment({
        bookingId : req.body.bookingId,
        userId: req.body.userId,
        totalCost : req.body.totalCost,
      });
      in_memoDb[idempotencyKey]=idempotencyKey;
      SuccessResponse.data = response;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      console.log("error in controller",error);
      ErrorResponse.error = error;
      return res.status(error.statusCode?error.statusCode:StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }

module.exports = {
    createBooking,
    makePayment
}