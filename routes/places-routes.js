const express = require("express");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:pid", placesController.getPlacebyId);

router.get("/user/:uid", placesController.getPlacebyUserId);

module.exports = router;
