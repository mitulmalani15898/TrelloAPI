const router = require('express').Router();

const { Board, User } = require('../sequelize/sequelize');

// get all boards
router.get('/', (req, res) => {
  Board.findAll()
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get board by id
router.get('/:boardId', (req, res) => {
  Board.findByPk(req.params.boardId)
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get boards by userId
router.get('/user/:userId', (req, res) => {
  Board.findAll({
    where: { userId: req.params.userId },
    include: [{
      model: Board
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get boards by teamId
router.get('/team/:teamId', (req, res) => {
  Board.findAll({
    where: { teamId: req.params.teamId },
    include: [{
      model: Board
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// post board
router.post('/', (req, res) => {
  const obj = new Board();
  obj.userId = req.body.userId;
  obj.teamId = req.body.teamId;
  obj.boardName = req.body.boardName;
  obj.scope = req.body.scope;
  obj.save()
    .then(board => {
      res.json(board).status(200);
    })
    .catch(err => {
      res.json({ 'error': JSON.stringify(err) }).status(400);
    })
})

// update board
router.put('/:id', (req, res) => {
  Board.update(req.body, {
    where: { id: req.params.id }
  }).then(response => {
    res.json(response).status(200);
  }).catch(err => {
    res.json({ 'error': JSON.stringify(err) }).status(400);
  })
})

module.exports = router;