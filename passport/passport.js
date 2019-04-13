const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { User } = require('../sequelize/sequelize');

const { jwtsecret } = require('../configs/general');
const { generateHash, matchHash } = require('../shared/common');

module.exports = passport => {

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    process.nextTick(() => {
      User.findOne({ where: { 'email': email } })
        .then(user => {
          if (user) {
            return done(null, false, "User already exists")
          } else {
            const newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = generateHash(req.body.password);
            return newUser.save().then(user => done(null, user))
              .catch(err => done(err))
          }
        })
        .catch(err => done(err))
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ where: { 'email': email } })
      .then(user => {
        if (!user) {
          return done(null, false, "User Doesn't Exist")
        } else if (!matchHash(password, user.password)) {
          return done(null, false, "Invalid Password")
        } else {
          return done(null, user);
        }
      })
      .catch(err => done(err))
  }))

  passport.use(new JWTstrategy({
    secretOrKey: jwtsecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  }, async (token, done) => {
    try {
      return done(null, token.email);
    } catch (err) {
      done(err)
    }
  }))
}