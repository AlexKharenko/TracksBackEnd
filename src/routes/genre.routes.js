const express = require('express');
const auth = require('../middleware/auth');
const { CheckIfContentMaker } = require('../middleware/check_role');

const router = express.Router();

const GenreController = require('../controllers/genre.controller');

router.get('/', GenreController.getGenres);
router.get('/:id', GenreController.getGenreById);
router.post('/create', auth, CheckIfContentMaker, GenreController.createGenre);
router.put('/update', auth, CheckIfContentMaker, GenreController.updateGenre);
router.delete(
  '/delete',
  auth,
  CheckIfContentMaker,
  GenreController.deleteGenre
);

module.exports = router;
