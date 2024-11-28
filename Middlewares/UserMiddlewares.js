const User = require("./../Models/User");

exports.adminOnly = async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "No user found" });
  } else {
    if (user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins Only" });
    }
  }
};

exports.ModeratorOrAdminOnly = (req, res, next) => {
  const user = User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({ message: "No user found" });
  } else {
    if (user.role === "Admin" || user.role === "Moderator") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied. Admins or Moderators Only" });
    }
  }
};
