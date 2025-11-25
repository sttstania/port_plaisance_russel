const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userService = require('../services/userService');

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);


module.exports = router;