const multer = require("multer"); // for upload file

// Middleware สำหรับจัดการการอัปโหลดไฟล์ (เช่น รูปภาพ)
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname); // เพิ่ม timestamp เพื่อป้องกันชื่อซ้ำ
  },
});

module.exports = multer({ storage: storage });
