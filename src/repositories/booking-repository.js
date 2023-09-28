const { StatusCodes} = require('http-status-codes')
const CrudRepository = require("./crud-repository");
const { Booking } = require('../models');

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
}

module.exports = BookingRepository;