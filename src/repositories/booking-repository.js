const { StatusCodes} = require('http-status-codes')
const CrudRepository = require("./crud-repository");
const { Booking } = require('../models');
const { Op } = require('sequelize');
const { Enums }  = require('../utils/common');
const { BOOKED, CANCELLED} = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking);
    }
    async createBooking(data, transaction)
    {
        const response = await Booking.create(data,{ transaction: transaction});
        return response;
    }
    async get(data,transaction)
    {
        const response = await this.model.findByPk(data,{ transaction:transaction});
        // console.log("booking response : ",response);
        if(!response)
        {
            throw new AppError("Not able to found the resource",StatusCodes.NOT_FOUND)
        }
        return response;
    }
    
    async update(id,data,transaction)
    {
        const response = await this.model.update(data,{
            where:{
                id:id,
            }
        },{ transaction:transaction});
        if(!response[0])
        {
            throw new AppError('Not able to update the resource',StatusCodes.NOT_FOUND)
        }
        return response;
    }
    async cancelOldBookings(timeStamp)
    {
        console.log("inside old");
        const response  = await Booking.update({status:CANCELLED},{
            where:{
                [Op.and]:[
                    {
                        createdAt:{
                            [Op.lt]:timeStamp
                        }
                    },
                    {
                        status:{
                            [Op.ne]:BOOKED
                        }
                    },
                    {
                        status:{
                            [Op.ne]:CANCELLED
                        }
                    }
                ]
                
            }
        })
        return response;
    }
}

module.exports = BookingRepository;