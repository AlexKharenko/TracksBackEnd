const express = require('express');
const auth = require('../middleware/auth');
const { CheckIfContentMaker } = require('../middleware/check_role');

const router = express.Router();

const TrackController = require('../controllers/track.controller');

router.get('/', TrackController.getTracks);
router.get('/:id', TrackController.getTrack);
router.post('/create', auth, CheckIfContentMaker, TrackController.createTrack);
router.put('/update', auth, CheckIfContentMaker, TrackController.updateTrack);
router.delete(
  '/delete',
  auth,
  CheckIfContentMaker,
  TrackController.deleteTrack
);

module.exports = router;
