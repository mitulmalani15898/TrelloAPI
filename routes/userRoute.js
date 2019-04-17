const router = require('express').Router();

const { User, Board } = require('../sequelize/sequelize');

// get all user with its boards
router.get('/', (req, res) => {
  User.findAll({
    include: [{
      model: Board
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get particular user with its boards
router.get('/:userId', (req, res) => {
  User.findByPk(req.params.userId, {
    include: [{
      model: Board,
      where: { teamId: 1 }
    }],

  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

module.exports = router;
