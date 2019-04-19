const router = require('express').Router();

const { Card } = require('../sequelize/sequelize');

// get all cards
router.get('/', (req, res) => {
  Card.findAll()
    .then(card => res.json(card).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get card by id
router.get('/:cardId', (req, res) => {
  Card.findByPk(req.params.cardId)
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// post card
router.post('/', (req, res) => {
  const obj = new Card();
  obj.listId = req.body.listId;
  obj.cardName = req.body.cardName;
  obj.save()
    .then(card => res.json(card).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// update card 
router.patch('/:cardId', (req, res) => {
  Card.update(req.body, {
    where: { id: req.params.cardId }
  }).then(response => {
    res.json(response).status(200);
  }).catch(err => {
    res.json({ 'error': JSON.stringify(err) }).status(400);
  })
})

module.exports = router;