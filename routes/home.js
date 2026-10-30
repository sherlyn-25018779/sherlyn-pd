const express = require('express');
const router = express.Router();
const { projects } = require('../data/projects');

// GET /  -> Home page (first 6 projects go in the carousel)
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Sherlyn Chua | Home',
    featured: projects.slice(0, 6)
  });
});

module.exports = router;