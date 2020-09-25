const HttpError = require("../models/http-error");

const { v4: uuid } = require("uuid");

const { validationResult } = require("express-validator");

const User = require("../models/user");

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

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Inputan Anda tidak valid", 422));
  }
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Terjadi kesalahan! Silakan kembali lagi nanti",
      500
    );
    return next(error);
  }

  if (existingUser) {
    return next(
      new HttpError(
        "Email yang Anda input telah digunakan oleh pengguna lain!",
        422
      )
    );
  }

  const createdUser = new User({
    name,
    email,
    image:
      "https://avatars1.githubusercontent.com/u/45768002?s=460&u=924d9d528e7b0b87171eb5e978e2bd5d3f50f1a1&v=4",
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Gagal menambahkan data!", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
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
