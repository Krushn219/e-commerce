
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:admin@cluster0.o6j4w.mongodb.net/ecommerce_platform?retryWrites=true&w=majority'
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

module.exports = db


