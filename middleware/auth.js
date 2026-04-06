const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isLoggedIn = async (req, res, next) => {
  try {

    // Get token from request header
    const authHeader = req.headers.authorization;

    // Header format: Authorization: Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, please login first" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to req so next middleware can use it
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired, login again" });
  }
};

module.exports = { isLoggedIn };