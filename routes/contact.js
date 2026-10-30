const express = require('express');
const router = express.Router();

// GET /contact  -> Contact page
router.get('/', (req, res) => {
  res.render('contact', { title: 'Sherlyn Chua | Contact', form: {} });
});

// POST /contact  -> handle the form
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  // basic validation
  if (!name || !email || !subject || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).render('contact', {
      title: 'Sherlyn Chua | Contact',
      form: req.body,
      error: 'Please fill in all fields with a valid email address.'
    });
  }

  // TODO: send an email (Nodemailer) or save to a database here.
  console.log('📩 New message:', { name, email, subject, message });

  req.session.flash = { type: 'success', text: 'Thanks! Your message has been sent.' };
  res.redirect('/contact');
});

module.exports = router;