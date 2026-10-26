
const jwt = require("jsonwebtoken");

function verifiedToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token not found in cookie",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN
    );

    req.user = decoded;
    next();

  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
}

module.exports = verifiedToken;
