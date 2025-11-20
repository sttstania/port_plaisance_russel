const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userService = require('../services/userService');

//Testing route
router.get('/test', (req, res) => {
  req.send('API is working!');
});

  //Create user route
  router.post('/users', userService.createUser);


module.exports = router;