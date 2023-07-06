const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 8081;
const errorHandler = require("./middleware/errorHandler");
const cloudinary = require("cloudinary");
const morgan = require("morgan");

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/users", require("./routes/userRoutes"));
app.use("/uploads", require("./routes/uploadRoutes"));

// Error handler
app.use(errorHandler);

cloudinary.config({
    cloud_name: "dar5mfo5u",
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log(`Db connected: ${res.connection.host}`);
});

app.listen(port, () => {
    console.log(`Server started in ${port}`);
});
