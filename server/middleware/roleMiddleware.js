const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("REQ.USER:", req.user);
    console.log("ALLOWED ROLES:", allowedRoles);

    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;