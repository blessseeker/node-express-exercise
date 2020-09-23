const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use("/api/places/", placesRoutes);
app.use("/api/users/", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Halaman tidak ditemukan", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ pesan: error.message || "Terjadi sebuah kesalahan" });
});

mongoose
  .connect(
    "mongodb://root:root@localhost:27017/merncourse?authSource=admin&readPreference=primary"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
