const express = require('express');
const router = express.Router();
const { categories, projects } = require('../data/projects');

// GET /portfolio?category=web  -> Portfolio page with filter
router.get('/', (req, res) => {
  const selected = categories.some(c => c.key === req.query.category) ? req.query.category : 'all';
  const list = selected === 'all' ? projects : projects.filter(p => p.category === selected);

  res.render('portfolio', {
    title: 'Sherlyn Chua | Portfolio',
    categories,
    selected,
    projects: list
  });
});

module.exports = router;