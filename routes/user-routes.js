const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAuth = require('../middleware/auth-middleware');
const db = require('../models');

// render the authentication page
router.get('/', checkAuth.checkNotAuth, (req, res) => {
    res.render('login');
});

// Render admin page
router.get('/admin', checkAuth.checkAuth, (req, res) => {
    res.render('admin', {user: req.user});
});

// Authentication with google
router.get('/auth', passport.authenticate('google', { scope: ['profile'] }));

// google auth callback
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/error' }), (req, res) => {
    res.redirect('/admin');
});


// render the error page
router.get('/error', (req, res) => {
    res.render('error');
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/');
  })

module.exports = router;