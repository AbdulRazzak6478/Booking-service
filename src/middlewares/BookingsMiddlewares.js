const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");



function validateCreateBookingRequest(req, res, next )
{
    if(!req.body.flightId)
    {
        ErrorResponse.message = "Something went wrong while creating Booking";
        ErrorResponse.error = new AppError(
          ["flightId not found in the oncoming request in the correct form"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.userId)
    {
        ErrorResponse.message = "Something went wrong while creating Booking";
        ErrorResponse.error = new AppError(
          ["userId not found in the oncoming request in the correct form"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.noOfSeats)
    {
        ErrorResponse.message = "Something went wrong while creating Booking";
        ErrorResponse.error = new AppError(
          ["noOfSeats not found in the oncoming request in the correct form"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next(); // proceed further
}

function checkPaymentRequest(req , res , next)
{
  
}

module.exports = {
    validateCreateBookingRequest,
}