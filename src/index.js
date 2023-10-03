const express = require('express');
const {ServerConfig:{PORT},Logger} = require('./config');
const apiRoutes =require('./routes');
const  CRONS = require('./utils/common/cron-jobs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api',apiRoutes);
// app.use('/bookingService/api',apiRoutes);


app.listen(PORT,()=>{
    console.log(`Successfully started the server on PORT ${PORT} `); 
    Logger.info("Successfully started server"," root ", {});
    CRONS;
});