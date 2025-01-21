require("dotenv").config();

const express = require("express");
const multer = require("multer");

// const cookieSession = require("cookie-session");
const session = require("express-session");
const passport = require("passport");
const { isAuthenticated } = require("./middlewares");
require("./controllers/auth");
const cors = require("cors");


const app = express();
const port = 4848;
const { db } = require("./models");

const router = require("./routes");
const { AsyncQueueError } = require("sequelize");

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Origin",
      "Access-Control-Request-Headers",
    ],
    credentials: true,
    enablePreflight: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: [process.env.COOKIE_KEY], 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  console.log("Sesiune:", req.session);
  next();
});


app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.get("/reset", async (req, res) => {
  try {
    await db.query("SET FOREIGN_KEY_CHECKS = 0");
    await db.sync({ force: true });
    await db.query("SET FOREIGN_KEY_CHECKS = 1");
    res.status(200).send("Db reset complete!");
  } catch (err) {
    res.status(500).send({ message: "Db reset error", err: err.message });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res, next) {
  console.log(req.file);
  res.send({ message: "Project uploaded successfully" });
});

app.get("/secret", isAuthenticated, (req, res) => {
  // res.status(200).send({ message: "Esti autorizat!" });
  // const user = req.user;

  // const expires = new Date(Date.now() + 900000) 
  //   res.cookie('user', JSON.stringify(user), { expires });
    res.redirect(302, "http://localhost:3000")
});

app.use("/*", (req, res) => {
  res.status(200).send("Rulez boss");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  console.log(`http://localhost:${port}`);
});
