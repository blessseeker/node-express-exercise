const express = require("express");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/:uid", usersController.getUserbyId);

module.exports = router;
