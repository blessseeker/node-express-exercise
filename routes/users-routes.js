const express = require("express");

const router = express.Router();

const USERS = [
  {
    id: "u1",
    name: "Kamaludin Khoir",
    image:
      "https://cdn.idntimes.com/content-images/avatar/kamaludin-khoir_200x200.jpg?v=80782c83ffa0f09ef565e33687c7ed8b",
    places: 1,
  },
  {
    id: "u2",
    name: "Usi Supinar",
    image:
      "https://pbs.twimg.com/profile_images/852513364550877184/922tr-_V.jpg",
    places: 2,
  },
];

router.get("/:uid", (req, res, next) => {
  userId = req.params.uid;
  user = USERS.find((u) => {
    return u.id === userId;
  });
  res.json({ user });
});

module.exports = router;
