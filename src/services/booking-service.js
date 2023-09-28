
const axios = require('axios');

const { BookingRepository } = require('../repositories')
const db = require('../models');
const { ServerConfig } = require('../config');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
// const { log } = require('winston');

const bookingRepository = new BookingRepository();

async function createBooking(data)
{
    const transaction =await db.sequelize.transaction();
   try {console.log('start');
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`)
        console.log('flight, ',flight);
        const flightData = flight.data.data;
        console.log("seats :",data.noOfSeats);
        if(data.noOfSeats > flightData.totalSeats)
        {
            throw new AppError('Not enough seats available',StatusCodes.BAD_REQUEST);
            // throw {message:'No of seats exceeds available seat'}
        } 
        const totalBillingAmt = data.noOfSeats * flightData.price;
        console.log(totalBillingAmt);
        const bookingPayload = {...data, totalCost: totalBillingAmt};
        const booking = await bookingRepository.create(bookingPayload, transaction);

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
            seats: data.noOfSeats
        })
        await transaction.commit();
        return booking;
   } catch (error) {
    console.log('flight service down',error.statusCode);
       await transaction.rollback();

       throw error;
   }
}

module.exports = {
    createBooking
}