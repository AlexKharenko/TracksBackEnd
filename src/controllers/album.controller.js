const AlbumService = require('../services/album.service');

exports.getAlbums = async (req, res) => {
  try {
    const albums = await AlbumService.getAlbums(req.query);
    if (albums.length === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: albums });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.getAlbum = async (req, res) => {
  try {
    const album = await AlbumService.getAlbumById(req.params.id);
    if (!album) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: album });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const album = JSON.parse(req.body.album);
    await AlbumService.createAlbum(album, req.files || {});
    return res.status(200).json({ success: true, message: 'Album created' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const album = JSON.parse(req.body.album);
    await AlbumService.updateAlbum(album, req.files || {});
    return res.status(200).json({ success: true, message: 'Album updated' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    await AlbumService.deleteAlbum(req.body.album);
    return res.status(200).json({ success: true, message: 'Album deleted' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
