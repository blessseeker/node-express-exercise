const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Ada request pada places");
  res.json({ pesan: "OK" });
});

module.exports = router;
