const fs= require('fs');
const Tour = require('./../../model/tourmodel')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env' });
//console.log(process.env);

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => { console.log('DB connection successfull')
})

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT DATA TO DB
const importdata = async()=>{
    try{
        await Tour.create(tours);
        console.log('data successfully loaded')
    }catch(err){
        console.log(err);
    }
}

//DELETE ALL DATA FROM COLLECTION
const deletedata = async()=>{
    try{
        await Tour.deleteMany({});
        console.log('Data succesfully deleted');
        process.exit();
    }catch{err}{
        console.log(err);
    }
}
if(process.argv[2] === '--import'){
    importdata();

}
else if(process.argv[2] === '--delete'){
    deletedata();
}

