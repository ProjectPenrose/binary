const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.text({ type: 'application/base64', limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Render EJS
const ejs = require("ejs-mate");
app.engine("html", ejs);
app.set("views", path.join(__dirname, "../static/views"));
app.set("view engine", "html");

const { BASE_URL = "http://localhost:3000" } = process.env;
console.log(BASE_URL);
app.use((req, res, next) => {
  const trustedDomains = [];
  if (trustedDomains.includes(req.headers.origin)) {
    res.setHeader('X-Frame-Options', `ALLOW-FROM ${req.headers.origin}`);
  } else {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  }
  res.locals = {
    baseUrl: BASE_URL,
    imgUrl: `${BASE_URL}/assets/img`,
    cssUrl: `${BASE_URL}/assets/css`,
    jsUrl: `${BASE_URL}/assets/js`,
    time: Date.now(),
  }
  next();
});

module.exports = app;