const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_DATABASE}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,  // Wait 30 seconds for connection
            socketTimeoutMS: 45000           // Allow socket to stay open for 45 seconds
        }
    )
    .then(() => {
        console.log("✅ Database connected successfully!");
    })
    .catch((err) => {
        console.error("❌ Database connection error:", err);
    });
};

module.exports = {dbConnect};
