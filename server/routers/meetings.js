const express = require('express');
const meetings = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase
} = require('../db');

meetings.get('/', (req,res,next) => {
  res.status(200).send(getAllFromDatabase('meetings'));
});

meetings.post('/', (req,res,next) => {
  const meeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(meeting);
});

meetings.delete('/', (req,res,next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetings;