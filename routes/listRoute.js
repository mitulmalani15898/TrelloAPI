const router = require('express').Router();

const { List, Card, Comment, CheckList, CheckListItem } = require('../sequelize/sequelize');

// get all list
router.get('/', (req, res) => {
  List.findAll({
    include: [{
      model: Card,
      include: [{
        model: Comment
      }, {
        model: CheckList,
        include: [{
          model: CheckListItem
        }]
      }]
    }]
  })
    .then(list => res.json(list).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// get list by id
router.get('/:listId', (req, res) => {
  List.findByPk(req.params.listId, {
    include: [{
      model: Card,
      include: [{
        model: Comment
      }, {
        model: CheckList,
        include: [{
          model: CheckListItem
        }]
      }]
    }]
  })
    .then(response => res.json(response).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// post list
router.post('/', (req, res) => {
  const obj = new List();
  obj.boardId = req.body.boardId;
  obj.listName = req.body.listName;
  obj.save()
    .then(list => res.json(list).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// update list 
router.patch('/:listId', (req, res) => {
  List.update(req.body, {
    where: { id: req.params.listId }
  }).then(response => {
    res.json(response).status(200);
  }).catch(err => {
    res.json({ 'error': JSON.stringify(err) }).status(400);
  })
})

module.exports = router;