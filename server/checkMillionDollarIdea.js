const checkMillionDollarIdea = (req,res,next) => {
  const weeks = +req.body.numWeeks;
  const rev = +req.body.weeklyRevenue;
  const value = weeks * rev;
  if(!weeks || !rev || value < 1000000 || isNaN(value)) {
    res.status(400).send();
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
