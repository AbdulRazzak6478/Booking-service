const cron = require('node-cron');

const {BookingService} = require('../../services')
function scheduleCron()
{
    // '*/5 * * * * *' for 5 sec
    // '*/10 * * * * ' for 10 min
    cron.schedule('*/30 * * * * ',async()=>{
        console.log('running in every minute',BookingService)
        const response = await BookingService.cancelOldBookings()
        console.log(response);
    })
}

module.exports =scheduleCron();