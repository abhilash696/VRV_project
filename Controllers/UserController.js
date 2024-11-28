//create register_user
const User = require("./../Models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Validator functions validates req.body data using validator npm package
const register_Validator = require("./../Validators/RegistrationValidator.js");
const login_Validator = require("./../Validators/LoginValidator.js");

exports.userRegister = async (req, res) => {
  console.log(req.body);
  const { errors, isValid } = register_Validator(req.body);
  const { name, email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email });

  if (user) {
    errors.email = "Email already exists";
    //statusCode 409 for conflicts
    res.status(409).json(errors);
  } else {
    const new_user = new User({
      name,
      email,
    });

    //Hashing and salting user password before saving the user to database.
    bcrypt.genSalt(10, async function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        try {
          new_user.password = hash;
          await new_user.save();
          res.status(201).json({ message: "User registered succesfully!" });
        } catch (err) {
          res.status(500).json({ message: "server error" });
        }
      });
    });
  }
};

exports.userLogin = async (req, res) => {
  const { errors, isValid } = login_Validator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    errors.email = "Email not found";
    return res.status(400).json(errors);
  } else {
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (!isMatch) {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      } else {
        //if password matches , send a signed jwt token indicating login succesful.
        const jwt_payload = {
          id: user._id,
          name: user.name,
        };
        jwt.sign(
          jwt_payload,
          process.env.secretOrkey,
          //setting token expiry for 1 hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      }
    });
  }
};

exports.updateUserRole = async (req, res) => {
  const { user_id, role } = req.body;

  const user = await User.findById(user_id);

  if (!user) {
    res.status(400).json({ message: "No user found" });
  } else {
    user.role = role;
    await user.save();
    res.status(200).json({ message: "User role updated succesfully" });
  }
};

exports.getModerator = (req, res) => {
  return res.status(200).json({
    message:
      "You can only view this page since you are either a moderator or admin",
  });
};
