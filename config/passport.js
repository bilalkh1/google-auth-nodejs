const db = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
  

  passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: ""
  },
  function(accessToken, refreshToken, user, cb) {
    db.User.findOne({where: { googleId: user.id }}).then((currentUser) => {
      if (currentUser) {
        return cb(null, currentUser);
      } else {
        const newUser = {
          googleId: user.id,
          firstName: user.name.givenName,
          lastName: user.name.familyName,
          image: user.photos[0].value,
        }
        db.User.create(newUser).then((user) => {
          return cb(null, user);
        })
      }
    })
    }
  ));

  passport.serializeUser((user, cb) => {
      cb(null, user.id);
  })

  passport.deserializeUser((id, cb) => {
      db.User.findOne({where: {id: id}}).then((user) => {
        cb(null, user.dataValues);
      })
  })

}
