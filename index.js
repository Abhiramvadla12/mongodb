const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

// Connect to Database
dbConnect();

mongoose.connection.once("open", () => {
    console.log(`✅ Connected to database: ${mongoose.connection.name}`);
});

// Define Schema & Model for Operators
const operatorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    email: String
},{"strict":false});

const operatorModel = mongoose.model("operators", operatorSchema); 

// GET Route for Operators
app.get("/operators", async (req, res) => {
    try {
        let data = await operatorModel.find();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Define Schema & Model for marustunna
const marstunnaSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    email: String
});

const marstunnaModel = mongoose.model("marustunna", marstunnaSchema, "marustunna");

// ✅ GET Route for marustunna
app.get("/marustunna", async (req, res) => {
    try {
        let data = await marstunnaModel.find();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// // ✅ Fixed POST Route for marustunna
// app.post("/marustunna", async (req, res) => {
//     console.log(req.body);
//     try {
//         const newUser = new marstunnaModel({
//             name: req.body.name,
//             age: req.body.age,
//             gender: req.body.gender,
//             email: req.body.email
//         });

//         await newUser.save();
//         res.send({
//             message: "✅ Data inserted successfully into marustunna",
//             user: newUser
//         });
//     } catch (error) {
//         console.error("❌ Error inserting data into marustunna:", error);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// });

app.post("/marustunna_post",async(req,res)=>{
    try{
        const data=req.body;
        console.log(data);
        let post=await marstunnaModel.create(data)
        res.send({
            message: "✅ Data inserted successfully into marustunna",
            user: post
        });


    }
    catch (error) {
        console.error("❌ Error inserting data into marustunna:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
    

})

//updating using put 

app.put("/operators/:name",async(req,res)=>{
        console.log(req.params);
        console.log(req.body);
        let result = await operatorModel.updateOne({
           "name": req.params.name
        },req.body);
        if(result){
            res.send("data updated successfully !!!");
        }
        else{
            res.send("unable to update the data ");
        }
})

//delete api :
const userSchema = new mongoose.Schema({
    nam: String
})

const userModel = mongoose.model("users",userSchema)
app.delete("/users/:peru",async(req,res)=>{
    console.log(req.params);
    let result = await userModel.deleteOne({
       "name": req.params.peru
    });
    if(result.deletedCount > 0){
        res.send("data deleted successfully !!!");
    }
    else{
        res.send("unable to delete the data ");
    }
})
// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
