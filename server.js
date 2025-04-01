const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8899;

// Middleware
app.use(express.json()); // แปลง request body เป็น JSON
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // อนุญาต origin จาก localhost:5173 (Frontend-User) และ localhost:5174 (Frontend-Admin)
    credentials: true, // อนุญาตส่ง cookies หรือ headers เช่น Authorization
  })
);

// Routes
app.use("/api/user", require("./routes/auth-route"));
app.use("/api/product", require("./routes/product-route"));
app.use("/api/cart", require("./routes/cart-route"));
app.use("/api/order", require("./routes/order-route"));
app.use("/api/manageuser", require("./routes/user-route"));

app.get("/", (req, res) => {
  res.send("API Working"); // ส่งข้อความ "API Working" เพื่อทดสอบเซิร์ฟเวอร์
});

app.listen(port, () => console.log(`Server started on PORT : ${port}`));
