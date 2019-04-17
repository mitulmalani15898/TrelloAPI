const router = require('express').Router();

const { Board, List, Card } = require('../sequelize/sequelize');

// get all boards
router.get('/', (req, res) => {
  Board.findAll({
    include: [{
      model: List,
      include: [{
        model: Card
      }]
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get board by id
router.get('/:boardId', (req, res) => {
  Board.findByPk(req.params.boardId, {
    include: [{
      model: List,
      include: [{
        model: Card
      }]
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// // get boards by userId
// router.get('/user/:userId', (req, res) => {
//   Board.findAll({
//     where: { userId: req.params.userId }
//   })
//     .then(response => res.json(response).status(200))
//     .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
// })

// // get boards by teamId
// router.get('/team/:teamId', (req, res) => {
//   Board.findAll({
//     where: { teamId: req.params.teamId }
//   })
//     .then(response => res.json(response).status(200))
//     .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
// })

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
router.patch('/:boardId', (req, res) => {
  Board.update(req.body, {
    where: { id: req.params.boardId }
  }).then(response => {
    res.json(response).status(200);
  }).catch(err => {
    res.json({ 'error': JSON.stringify(err) }).status(400);
  })
})

module.exports = router;