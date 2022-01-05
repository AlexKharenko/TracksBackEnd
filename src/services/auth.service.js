const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('./user.service');
const { Error400, Error500 } = require('../errors/index');

exports.Login = async (login_data) => {
  const user = await UserService.getUserByEmail(login_data.email, true);
  if (!user) throw new Error400('Email or password incorect');
  if (!(await bcrypt.compare(login_data.password, user.password))) {
    throw new Error400('Email or password incorect');
  }
  const { password, ...new_user } = user;
  const token = jwt.sign(new_user, `${process.env.JWT_SECRET}`, {
    expiresIn: '12h',
  });
  return token;
};

exports.SignUp = async (register_data) => {
  const isLoginExist = await UserService.isLoginExist(register_data.login);
  if (isLoginExist) throw new Error400('Login exist');
  const isEmailExist = await UserService.isEmailExist(register_data.email);
  if (isEmailExist) throw new Error400('Email exist');
  try {
    UserService.createUser(register_data);
  } catch (err) {
    throw new Error500(err);
  }
};
