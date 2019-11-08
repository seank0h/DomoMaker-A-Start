const models = require('../models');

const Domo = models.Domo;

const makerPage = (req, res) => {
  Domo.DomoModel.findbyOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An Error has Occured',
      });
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};
const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.exp || !req.body.questType) {
    return res.status(400).json({ error: 'Rawr: All parameters are required' });
  }
  const domoData = {
    name: req.body.name,
    age: req.body.age,
    questType: req.body.questType,
    experience: req.body.exp,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));
  domoPromise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }

    return res.status(400).json({ error: 'An Error Occurred' });
  });
  return domoPromise;
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findbyOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ domos: docs });
  });
};

const deleteQuest = (request,response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findbyOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
   
  });
};
module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.getDomos = getDomos;
module.exports.deleteQuest = deleteQuest;

