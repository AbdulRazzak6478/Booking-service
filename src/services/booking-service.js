
const axios = require('axios');

const { BookingRepository } = require('../repositories')
const db = require('../models');
const { ServerConfig } = require('../config');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

async function createBooking(data)
{
    return new Promise((resolve,reject)=>{
        
        const result = db.sequelize.transaction(async function bookingImpl(t){
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`)
            const flightData = flight.data.data;
            if(data.noOfSeats > flightData.totalSeats)
            {
                reject(new AppError('Not enough seats available',StatusCodes.BAD_REQUEST));
                // throw {message:'No of seats exceeds available seat'}
            }
            resolve(true);
        })
    })
}

module.exports = {
    createBooking
}