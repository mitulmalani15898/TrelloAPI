const router = require('express').Router();

const { Team, Board } = require('../sequelize/sequelize');

// get all teams with its boards
router.get('/', (req, res) => {
  Team.findAll({
    include: [{
      model: Board
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get particular team with its boards
router.get('/:teamId', (req, res) => {
  Team.findByPk(req.params.teamId, {
    include: [{
      model: Board
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get teams by userId
router.get('/user/:userId', (req, res) => {
  Team.findAll({
    where: { userId: req.params.userId },
    include: [{
      model: Board
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// post team
router.post('/', (req, res) => {
  const obj = new Team();
  obj.userId = req.body.userId;
  obj.teamName = req.body.teamName;
  obj.teamDescription = req.body.teamDescription;
  obj.save()
    .then(team => {
      res.json(team).status(200);
    })
    .catch(err => {
      res.json({ 'error': JSON.stringify(err) }).status(400);
    })
})

module.exports = router;