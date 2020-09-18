const HttpError = require("../models/http-error");

const { v4: uuid } = require("uuid");

const { validationResult } = require("express-validator");

const USERS = [
  {
    id: "u1",
    name: "Kamaludin Khoir",
    email: "khoirkamaludin@gmail.com",
    password: "rahasia",
    image:
      "https://cdn.idntimes.com/content-images/avatar/kamaludin-khoir_200x200.jpg?v=80782c83ffa0f09ef565e33687c7ed8b",
    places: 1,
  },
  {
    id: "u2",
    name: "Usi Supinar",
    email: "usisupinar@gmail.com",
    password: "gakboleh",
    image:
      "https://pbs.twimg.com/profile_images/852513364550877184/922tr-_V.jpg",
    places: 2,
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: USERS });
};

const getUserbyId = (req, res, next) => {
  userId = req.params.uid;
  user = USERS.find((u) => {
    return u.id === userId;
  });
  if (!user) {
    throw new HttpError("tidak ada user dengan id ini", 404);
  }
  res.json({ user });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Inputan Anda tidak valid", 422);
  }
  const { name, email, password } = req.body;

  const checkUser = USERS.find((u) => u.email === email);
  if (checkUser) {
    throw new HttpError("Email telah terdaftar! Tidak bisa digunakan", 422);
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("email atau password salah", 401);
  }

  res.json({ message: "Anda berhasil login" });
};

exports.getUsers = getUsers;
exports.getUserbyId = getUserbyId;
exports.signup = signup;
exports.login = login;
