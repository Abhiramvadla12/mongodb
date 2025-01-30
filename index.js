const express = require("express");
const mongoose = require("mongoose");
const {dbConnect} = require("./dbConnect");
require("dotenv").config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3003;

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
}, { "strict": false });

const operatorModel = mongoose.model("operators", operatorSchema);

// ✅ GET Route for Operators
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

// ✅ Define Schema & Model for "marustunna"
const marstunnaSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    email: String
});

const marstunnaModel = mongoose.model("marustunna", marstunnaSchema, "marustunna");

// ✅ GET Route for "marustunna"
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

// ✅ POST Route for "marustunna"
app.post("/marustunna", async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        let post = await marstunnaModel.create(data);
        res.send({
            message: "✅ Data inserted successfully into marustunna",
            user: post
        });
    } catch (error) {
        console.error("❌ Error inserting data into marustunna:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// ✅ PUT Route to update "operators"
app.put("/operators/:name", async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        let result = await operatorModel.updateOne({ "name": req.params.name }, req.body);
        
        if (result.modifiedCount > 0) {
            res.send("✅ Data updated successfully!");
        } else {
            res.send("⚠️ No matching data found to update.");
        }
    } catch (error) {
        console.error("❌ Error updating data:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// ✅ DELETE API for "users"
const userSchema = new mongoose.Schema({ name: String });
const userModel = mongoose.model("users", userSchema);

app.delete("/users/:name", async (req, res) => {
    try {
        console.log(req.params);
        let result = await userModel.deleteOne({ "name": req.params.name });

        if (result.deletedCount > 0) {
            res.send("✅ Data deleted successfully!");
        } else {
            res.send("⚠️ Unable to find the data to delete.");
        }
    } catch (error) {
        console.error("❌ Error deleting data:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
