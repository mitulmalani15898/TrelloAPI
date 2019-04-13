const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { jwtsecret } = require('../configs/general');
const { generateErrorJSON } = require('../shared/common');


router.post('/signup', (req, res, next) => {
  return passport.authenticate('local-signup', (err, passportUser, info) => {
    if (err) {
      return res.status(400).send(generateErrorJSON(err.message, err))
    }
    if (passportUser) {
      const user = {
        name: req.body.name,
        email: req.body.email
      };
      return res.json({ user })
    }
    return res.status(400).send(generateErrorJSON(info))
  })(req, res, next);
})

router.post('/login', (req, res, next) => {
  return passport.authenticate('local-login', (err, passportUser, info) => {
    if (err) {
      return res.status(400).send(generateErrorJSON(err.message, err))
    }
    if (passportUser) {
      const user = {
        id: passportUser.id,
        name: passportUser.name,
        email: passportUser.email
      };
      user.token = jwt.sign({ email: passportUser.email, id: passportUser.id }, jwtsecret);
      return res.json({ user });
    }
    return res.status(400).send(generateErrorJSON(info));
  })(req, res, next);
})

module.exports = router;