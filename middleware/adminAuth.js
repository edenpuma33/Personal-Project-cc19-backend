const jwt = require("jsonwebtoken");
// jsonwebtoken: ใช้สำหรับตรวจสอบและถอดรหัส JWT (JSON Web Token)

module.exports.adminAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  // แยกส่วน token ออกจาก "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }
  const token = authorization.split(" ")[1];

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden. Admin Access Only" });
    }
    req.admin = token_decode;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
