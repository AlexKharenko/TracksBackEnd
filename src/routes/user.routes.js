const express = require('express');
const auth = require('../middleware/auth');
const { CheckIfAdmin } = require('../middleware/check_role');

const router = express.Router();

const UserController = require('../controllers/user.controller');

router.get('/', auth, CheckIfAdmin, UserController.getUsers);
router.get('/roles', auth, CheckIfAdmin, UserController.getRoles);
router.get('/profile', auth, UserController.getUser);
router.post('/changerole', auth, CheckIfAdmin, UserController.changeUserRole);
router.delete('/delete', auth, CheckIfAdmin, UserController.deleteUser);

module.exports = router;
