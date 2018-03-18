const express = require('express');
const ideas = express.Router();
const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('../db');

ideas.param('ideaId', (req,res,next,id) => {
  const idea = getFromDatabaseById('ideas', id);
  if(idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideas.get('/', (req,res,next) => {
  res.status(200).send(getAllFromDatabase('ideas'));
});

ideas.post('/', checkMillionDollarIdea, (req,res,next) => {
  const idea = addToDatabase('ideas', req.body);
  res.status(201).send(idea);
});

ideas.get('/:ideaId', (req,res,next) => {
  res.send(req.idea);
});

ideas.put('/:ideaId', checkMillionDollarIdea, (req,res,next) => {
  const idea = updateInstanceInDatabase('ideas', req.body);
  res.send(idea);
});

ideas.delete('/:ideaId', (req,res,next) => {
  deleteFromDatabasebyId('ideas', req.idea.id);
  res.status(204).send();
});

module.exports = ideas;