const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();
require("dotenv").config();

const path = require("path");
const fs = require("fs");
const db = require("./config/database");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/error");

app.use(morgan("tiny"));
app.use(cors());
// setup bodyparser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorMiddleware);

// route connection
// app.use("/", require("./routes"));
app.use("/", (req, res) => {
  res.send("Api Running Successfully...");
});

// server connection
app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}!`);
});
