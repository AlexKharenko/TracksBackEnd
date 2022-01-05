const ArtistService = require('../services/artist.service');

exports.getArtists = async (req, res) => {
  try {
    const artists = await ArtistService.getArtists(req.query);
    if (artists.length === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: artists });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.getArtist = async (req, res) => {
  try {
    const artist = await ArtistService.getArtistById(req.params.id);
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: artist });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.createArtist = async (req, res) => {
  try {
    const artist = JSON.parse(req.body.artist);
    await ArtistService.createArtist(artist, req.files || {});
    return res.status(200).json({ success: true, message: 'Artist created' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const artist = JSON.parse(req.body.artist);
    await ArtistService.updateArtist(artist, req.files || {});
    return res.status(200).json({ success: true, message: 'Artist updated' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    await ArtistService.deleteArtist(req.body.artist);
    return res.status(200).json({ success: true, message: 'Artist deleted' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
