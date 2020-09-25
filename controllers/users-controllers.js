const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Terjadi kesalahan! Silakan coba beberapa saat lagi!",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
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
  const { name, email, password } = req.body;

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
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Gagal menambahkan data!", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Terjadi kesalahan! Coba beberapa saat lagi",
      500
    );
    return next(error);
  }

  if (!existingUser || password != existingUser.password) {
    const error = new HttpError("Kredensial yang Anda masukkan salah!", 401);
    return next(error);
  }

  res.json({ message: "Anda berhasil login" });
};

exports.getUsers = getUsers;
exports.getUserbyId = getUserbyId;
exports.signup = signup;
exports.login = login;
