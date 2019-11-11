const models = require('../models');

const Quest = models.Quest;

const makerPage = (req, res) => {
  Quest.QuestModel.findbyOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An Error has Occured',
      });
    }
    return res.render('app', { csrfToken: req.csrfToken(), Quests: docs });
  });
};
const makeQuest = (req, res) => {
  if (!req.body.name || !req.body.exp || !req.body.questType) {
    return res.status(400).json({ error: 'All Parameters Are Required For Quest Submission' });
  }
  const QuestData = {
    name: req.body.name,
    questType: req.body.questType,
    experience: req.body.exp,
    owner: req.session.account._id,
  };

  const newQuest = new Quest.QuestModel(QuestData);

  const QuestPromise = newQuest.save();

  QuestPromise.then(() => res.json({ redirect: '/maker' }));
  QuestPromise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Quest already exists' });
    }

    return res.status(400).json({ error: 'An Error Occurred in Making' });
  });
  return QuestPromise;
};

const getQuests = (request, response) => {
  const req = request;
  const res = response;

  return Quest.QuestModel.findbyOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured in Getting' });
    }
    return res.json({ Quests: docs });
  });
};
/*
const deleteQuest = (request, response) => {
  const req = request;
  const res = response;

  return Quest.QuestModel.findbyOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    console.log(req.session.QuestList);
   // Quest.QuestModel.deleteOne(req.session.Quests.name, res);
   return res.json({ Quests: docs });
  });
};
*/
module.exports.makerPage = makerPage;
module.exports.make = makeQuest;
module.exports.getQuests = getQuests;
// module.exports.deleteQuest = deleteQuest;

