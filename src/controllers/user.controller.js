const UserService = require('../services/user.service');

exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers(req.query);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await UserService.getRoles();
    if (roles.length === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: roles });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.body.user.user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    await UserService.changeUserRole(req.body.user_data);
    return res
      .status(200)
      .json({ success: true, message: 'Role changed succesfully' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.body.user_data);
    return res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
