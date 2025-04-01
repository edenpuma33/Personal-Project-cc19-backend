const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized: Invalid header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized: No token provided" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode);

    const userId = token_decode.id || token_decode.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized: Invalid token payload" });
    }

    req.user = { id: userId };
    next();
  } catch (error) {
    console.log("Token verification error:", error.message);
    if (error.name === "TokenExpiredError") {
      console.log("Token expired at:", error.expiredAt);
    }
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized: Invalid or expired token" });
  }
};