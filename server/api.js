const express = require('express');
const apiRouter = express.Router();

const minions = require('./routers/minions');
apiRouter.use('/minions', minions);

const ideas = require('./routers/ideas');
apiRouter.use('/ideas', ideas);

const meetings = require('./routers/meetings');
apiRouter.use('/meetings', meetings);


module.exports = apiRouter;
