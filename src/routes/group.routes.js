const express = require('express');
const auth = require('../middleware/auth');
const { CheckIfContentMaker } = require('../middleware/check_role');

const router = express.Router();

const GroupController = require('../controllers/group.controller');

router.get('/', GroupController.getGroups);
router.get('/:id', GroupController.getGroup);
router.post('/create', auth, CheckIfContentMaker, GroupController.createGroup);
router.put('/update', auth, CheckIfContentMaker, GroupController.updateGroup);
router.delete(
  '/delete',
  auth,
  CheckIfContentMaker,
  GroupController.deleteGroup
);

module.exports = router;
