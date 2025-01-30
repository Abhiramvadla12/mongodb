
const mongoose = require("mongoose");


const dbConnect = ()=>{
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_DATABASE}`)
//    mongoose.connect ("mongodb+srv://abhiramvadla61:5QaPYASQqJXqTIP3@cluster0.jfsu4.mongodb.net/mongodb_examples")
    .then(()=>{
        console.log("database connected !!!");
    })
    .catch((err)=>{
        console.log("error in connection ",err);
    })
}

module.exports = dbConnect