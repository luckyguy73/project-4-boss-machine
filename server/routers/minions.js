const express = require('express');
const minions = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('../db');

minions.param('minionId', (req,res,next,id) => {
  const minion = getFromDatabaseById('minions', id);
  if(minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minions.param('workId', (req,res,next,id) => {
  const work = getFromDatabaseById('work', id);
  if(work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minions.get('/', (req,res,next) => {
  res.status(200).send(getAllFromDatabase('minions'));
});

minions.post('/', (req,res,next) => {
  const minion = addToDatabase('minions', req.body);
  res.status(201).send(minion);
});

minions.get('/:minionId', (req,res,next) => {
  res.send(req.minion);
});

minions.put('/:minionId', (req,res,next) => {
  const minion = updateInstanceInDatabase('minions', req.body);
  res.send(minion);
});

minions.delete('/:minionId', (req,res,next) => {
  deleteFromDatabasebyId('minions', req.minion.id);
  res.status(204).send();
});

minions.get('/:minionId/work', (req,res,next) => {
  const minionWork = getAllFromDatabase('work').filter(w => w.minionId === req.minion.id);
  res.send(minionWork);
});

minions.post('/:minionId/work', (req,res,next) => {
  req.body.minionId = req.body.minionId || req.minion.id;
  const minionWork = addToDatabase('work', req.body);
  res.status(201).send(minionWork);
});

minions.put('/:minionId/work/:workId', (req,res,next) => {
  if(req.work.minionId !== req.minion.id) {
    res.status(400).send();
  } else {
    const work = updateInstanceInDatabase('work', req.body);
    res.send(work);
  }
});

minions.delete('/:minionId/work/:workId', (req,res,next) => {
  const deletedWork = deleteFromDatabasebyId('work', req.work.id);
  if(deletedWork) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minions;









