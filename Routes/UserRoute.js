const express = require("express");
const {
  userRegister,
  userLogin,
  updateUserRole,
  getModerator,
} = require("./../Controllers/UserController");
const router = express.Router();
const passport = require("passport");
const {
  adminOnly,
  ModeratorOrAdminOnly,
} = require("./../Middlewares/UserMiddlewares");

/*
 * This route processes user registration:
 * 1. Validates the user input.
 * 2. Checks if the email already exists.
 * 3. Hashes the password and saves the user to the database.
 */
router.post("/register", userRegister);

/*
 * This route processes user login functionality:
 * 1. Validates the user input.
 * 2. Checks if the email already exists.
 * 3. Checks for match in password.
 * 4. Sends a signed Jwt cookie if password matches and login is succesful
 */
router.post("/login", userLogin);

/*
 * This route updates user role:
 * 1. Validates the user input.
 * 2. Checks if user is logged in.
 * 3. Checks if the user has Admin privileges.
 * 4. If he does, request is forwarded to controller logic.
 */
router.put(
  "/admin/update_role",
  //Make sure the user is logged in before accessing thsi route
  passport.authenticate("jwt", { session: false }),
  //admin-only middleware
  adminOnly,
  updateUserRole
);

/*
 * This route simply demonstrates Role Based Access :
 * 1. Validates the user input.
 * 2. Checks if user is logged in.
 * 3. Checks if user is either admin or Moderator.
 * 4. If he is, request is forwarded to controller logic.
 */
router.get(
  "/moderatorOrAdmin",
  passport.authenticate("jwt", { session: false }),
  ModeratorOrAdminOnly,
  getModerator
);

module.exports = router;
