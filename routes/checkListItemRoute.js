const router = require('express').Router();

const { CheckListItem } = require('../sequelize/sequelize');

// get all checklistsitem
router.get('/', (req, res) => {
  CheckListItem.findAll()
    .then(card => res.json(card).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

// post checklist
router.post('/', (req, res) => {
  const obj = new CheckListItem();
  obj.checkListId = req.body.checkListId;
  obj.checkListItemName = req.body.checkListItemName;
  obj.save()  
    .then(checkListItem => res.json(checkListItem).status(200))
    .catch(err => res.json({ 'error': JSON.stringify(err) }).status(400))
})

module.exports = router;