const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const userRoute = require("./Routes/UserRoute");

dotenv.config();

const App = express();
const port = process.env.PORT || 3000;

// used to parse URL-encoded data like form submission data into req.body.
App.use(bodyParser.urlencoded({ extended: true }));

App.use(bodyParser.json());

//Connecting to our mongodb database.
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("connection succesfull"))
  .catch((err) => {
    console.log(err);
  });

//Setting up Passport authenticator
App.use(passport.initialize());
require("./Middlewares/Passport")(passport);

//Setting up user router to handle all user related routes.
App.use("/api/user", userRoute);

//Home page route
App.get("/", (req, res) => {
  res.json({ message: "This is Home page" });
});

App.listen(port, () => {
  console.log(`app running on port ${port}`);
});
