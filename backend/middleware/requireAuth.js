const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const jwtoken = req.headers.authorization.split(" ")[1];

  if (!jwtoken) {
    res.status(401).json({
      success_jwt: false,
      message: "Login first",
    });
  } else {
    try {
      const decoded = jwt.verify(jwtoken, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      // Handle JWT verification errors
      return res.status(401).json({
        success_jwt: false,
        message: "Invalid or expired token",
      });
    }
  }
};

module.exports = requireAuth;
