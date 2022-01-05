const AuthService = require('../services/auth.service');

exports.Login = async (req, res) => {
  try {
    const token = await AuthService.Login(req.body.login_data);
    return res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
        sameSite: 'none',
        secure: true,
      })
      .json({
        success: true,
        message: 'You are succesfully logged in!',
      });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.SignUp = async (req, res) => {
  try {
    await AuthService.SignUp(req.body.register_data);
    return res
      .status(200)
      .json({ success: true, message: 'You are succesfully signed up!' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.LogOut = async (req, res) => {
  try {
    return res
      .cookie('jwt', '', {
        httpOnly: true,
        maxAge: 0,
        sameSite: 'none',
        secure: true,
      })
      .status(201)
      .json({ success: true, message: 'You are succesfully logged out!' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
