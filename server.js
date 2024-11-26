const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const App = express();
const port = process.env.PORT || 3000;

App.listen(port, () => {
  console.log(`app running on port ${port}`);
});
