// app.js
// Main entry point for Sherlyn Chua's portfolio website.
// Run with: npm run dev   (uses nodemon)   or   node app.js

require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const site = require('./data/site');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- View engine ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'partials/layout'); // navbar + footer wrap every page

// ---------- Middleware ----------
app.use(express.urlencoded({ extended: true })); // form submissions
app.use(express.json());                          // JSON bodies
app.use(methodOverride('_method'));               // lets forms send PUT/DELETE
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Make shared info available in every view
app.use((req, res, next) => {
  res.locals.site = site;                 // name, email, social links
  res.locals.currentPath = req.path;      // used to highlight the active navbar link
  res.locals.year = new Date().getFullYear();

  // one-time flash message (e.g. after sending the contact form)
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;
  next();
});

// ---------- Routes ----------
const homeRoutes = require('./routes/home');           // Home page
const portfolioRoutes = require('./routes/portfolio'); // Portfolio + filter
const aboutRoutes = require('./routes/about');         // About page
const contactRoutes = require('./routes/contact');     // Contact form

app.use('/', homeRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);

// ---------- 404 handler (must stay last) ----------
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
});