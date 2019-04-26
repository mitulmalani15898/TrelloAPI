const router = require('express').Router();

const { Comment } = require('../sequelize/sequelize');

// get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(card => res.json(card).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get comment by id
router.get('/:commentId', (req, res) => {
  Comment.findByPk(req.params.commentId)
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// post comment
router.post('/', (req, res) => {
  const obj = new Comment();
  obj.cardId = req.body.cardId;
  obj.userId = req.body.userId;
  obj.comment = req.body.comment;
  obj.save()
    .then(comment => res.json(comment).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// update commment 
router.patch('/:commentId', (req, res) => {
  Comment.update(req.body, {
    where: { id: req.params.commentId }
  }).then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// delete commment 
router.delete('/:commentId', (req, res) => {
  Comment.destroy({ where: { id: req.params.commentId } })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

module.exports = router;