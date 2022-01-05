const TrackService = require('../services/track.service');

exports.getTracks = async (req, res) => {
  try {
    const tracks = await TrackService.getTracks(req.query);
    if (tracks.length === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: tracks });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.getTrack = async (req, res) => {
  try {
    const track = await TrackService.getTrackById(req.params.id);
    if (!track) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: track });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.createTrack = async (req, res) => {
  try {
    const track = JSON.parse(req.body.track);
    await TrackService.createTrack(track, req.files || {});
    return res.status(200).json({ success: true, message: 'Track created' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.updateTrack = async (req, res) => {
  try {
    const track = JSON.parse(req.body.track);
    await TrackService.updateTrack(track, req.files || {});
    return res.status(200).json({ success: true, message: 'Track updated' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.deleteTrack = async (req, res) => {
  try {
    await TrackService.deleteTrack(req.body.track);
    return res.status(200).json({ success: true, message: 'Track deleted' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
