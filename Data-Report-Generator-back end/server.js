const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require('./db');
const { testConnection } = require('./db');
const path = require("path");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

testConnection();

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/downloads", express.static(path.join(__dirname, "reports")));

const reportRoutes = require("./routes/reports");
app.use("/api/reports", reportRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
