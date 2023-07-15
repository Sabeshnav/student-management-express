const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const asyncHandler = require('express-async-handler');
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;




app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);





app.listen(port, () => {
    console.log("server running on port " + port);
})
