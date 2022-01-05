const GenreService = require('../services/genre.service');

exports.getGenres = async (req, res) => {
  try {
    const genres = await GenreService.getGenres();
    if (genres.length === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.status(200).json({ success: true, data: genres });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
exports.getGenreById = async (req, res) => {
  try {
    const genre = await GenreService.getGenreById(req.params.id);
    return res.status(200).json({ success: true, data: genre });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
exports.createGenre = async (req, res) => {
  try {
    await GenreService.createGenre(req.body.genre);
    return res.status(200).json({ success: true, message: 'genre created' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.updateGenre = async (req, res) => {
  try {
    await GenreService.updateGenre(req.body.genre);
    return res.status(200).json({ success: true, message: 'Genre updated' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    await GenreService.deleteGenre(req.body.genre);
    return res.status(200).json({ success: true, message: 'Genre deleted' });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
