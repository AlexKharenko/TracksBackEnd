const express = require('express');
const auth = require('../middleware/auth');
const { CheckIfContentMaker } = require('../middleware/check_role');

const router = express.Router();

const AlbumController = require('../controllers/album.controller');

router.get('/', AlbumController.getAlbums);
router.get('/:id', AlbumController.getAlbum);
router.post('/create', auth, CheckIfContentMaker, AlbumController.createAlbum);
router.put('/update', auth, CheckIfContentMaker, AlbumController.updateAlbum);
router.delete(
  '/delete',
  auth,
  CheckIfContentMaker,
  AlbumController.deleteAlbum
);

module.exports = router;
