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
    return res.render('app', { crsfToken: req.crsfToken(), domos: docs });
  });
};
const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Rawr: Both name and age are required' });
  }
  const domoData = {
    name: req.body.name,
    age: req.body.age,
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
module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
