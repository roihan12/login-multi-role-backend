import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account" });
  }

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "User doesn't exist" });
  }
  req.userId = user.id;
  req.role = user.role;

  console.log("from middleware", req.role);
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "User doesn't exist" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ msg: "Forbideen access" });
  }

  next();
};
