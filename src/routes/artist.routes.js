const express = require('express');
const auth = require('../middleware/auth');
const { CheckIfContentMaker } = require('../middleware/check_role');

const router = express.Router();

const ArtistController = require('../controllers/artist.controller');

router.get('/', ArtistController.getArtists);
router.get('/:id', ArtistController.getArtist);
router.post(
  '/create',
  auth,
  CheckIfContentMaker,
  ArtistController.createArtist
);
router.put('/update', auth, CheckIfContentMaker, ArtistController.updateArtist);
router.delete(
  '/delete',
  auth,
  CheckIfContentMaker,
  ArtistController.deleteArtist
);

module.exports = router;
