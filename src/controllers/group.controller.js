const GroupService = require('../services/group.service');

exports.getGroups = async (req, res) => {
  try {
    const groups = await GroupService.getGroups(req.query);
    if (groups.length === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: groups });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const group = await GroupService.getGroupById(req.params.id);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: group });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const group = JSON.parse(req.body.group);
    await GroupService.createGroup(group, req.files || {});
    return res.status(200).json({ success: true, message: 'Group created' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const group = JSON.parse(req.body.group);
    await GroupService.updateGroup(group, req.files || {});
    return res.status(200).json({ success: true, message: 'Group updated' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    await GroupService.deleteGroup(req.body.group);
    return res.status(200).json({ success: true, message: 'Group deleted' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
