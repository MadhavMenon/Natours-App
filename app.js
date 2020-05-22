const express =require('express');
const app = express();
const morgan = require("morgan");
const tourRouter = require('./routes/tourroutes');
const UserRouter = require('./routes/userroutes');


//MIDDLEWARE
//if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));

app.use(express.json()); 
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


//ROUTES
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/tours', tourRouter);


module.exports = app;