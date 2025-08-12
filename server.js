const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(session({ secret: 'benefit-ai-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const users = [];

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: 'GOOGLE_CLIENT_ID',
  clientSecret: 'GOOGLE_CLIENT_SECRET',
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  let user = users.find(u => u.id === profile.id);
  if (!user) {
    user = {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0].value,
      role: 'employee',
      department: 'Google',
      pointsBalance: 10000,
    };
    users.push(user);
  }
  return done(null, user);
}));

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: true,
}), (req, res) => {
  // Можно отправить JWT или редиректить на фронт с кукой
  res.redirect('http://localhost:8080');
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
}); 