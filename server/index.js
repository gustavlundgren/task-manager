const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const taskRoutes = require("./routes/tasks.js");
const authRoutes = require("./routes/auth.js");
const { register } = require("./controllers/auth.js");

/* Configuration */
dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* Multer */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

/* Routes with files */
app.post("/auth/register", upload.single("file"), register);

/* Routes */
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

/* Connect */
app.listen(PORT, () => console.log(`server listening on ${PORT}`));
