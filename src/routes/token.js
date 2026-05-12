const express = require('express');
const router = express.Router();

const {
  tokenCheck
} = require("../controllers/tokenController");

// GET /api/token
router.get('/', tokenCheck);

module.exports = router;