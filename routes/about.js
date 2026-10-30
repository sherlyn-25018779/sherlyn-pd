const express = require('express');
const router = express.Router();

// GET /about  -> About page
router.get('/', (req, res) => {
  res.render('about', {
    title: 'Sherlyn Chua | About',
    education: {
      school: 'Republic Polytechnic',
      course: 'Diploma in Information Technology',
      years: '2025 – Present'
    },
    programming: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL', 'Node.js'],
    design: ['Figma', 'Adobe Photoshop', 'Adobe Express', 'Canva'],
    certifications: ['Certification Name 1', 'Certification Name 2']
  });
});

module.exports = router;