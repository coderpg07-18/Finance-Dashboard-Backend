const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can do this" });
  }
  next();
};

const isAnalystOrAdmin = (req, res, next) => {
  if (req.user.role !== "analyst" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Only analysts and admins can do this" });
  }
  next();
};

module.exports = { isAdmin, isAnalystOrAdmin };