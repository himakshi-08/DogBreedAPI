require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const dogRoute = require("./routes/dogRoute");
const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
connectDB();
app.use("/auth", authRoute);
app.use("/api", dogRoute);
app.get("/", (req, res) => {
  res.send("Dog Breed Management API");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});