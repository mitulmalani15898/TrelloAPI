const router = require('express').Router();

const { CheckList } = require('../sequelize/sequelize');

// get all checklists
router.get('/', (req, res) => {
  CheckList.findAll({
    include: [{
      model: CheckListItem
    }]
  })
    .then(card => res.json(card).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// post checklist
router.post('/', (req, res) => {
  const obj = new CheckList();
  obj.cardId = req.body.cardId;
  obj.checkListName = req.body.checkListName;
  obj.save()
    .then(checkList => res.json(checkList).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

module.exports = router;