const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let QuestModel = {};

// Mongoose.Types.ObjectID is a funcation that converts string ID to real mongo ID

const convertID = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const QuestSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    set: setName,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  questType: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
});
// Static function to get the name and age from client
QuestSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  questType: doc.questType,
  experience: doc.exp,
});

// Find its owner
QuestSchema.statics.findbyOwner = (ownerId, callback) => {
  const search = {
    owner: convertID(ownerId),
  };
  return QuestModel.find(search).select('name questType experience').exec(callback);
};
// Find by username and then edit.
// Find Quest By ID and delete
QuestSchema.statics.deleteOne = (name, callback) => {
  const search = {
    name,
  };
  return QuestModel.findOneAndDelete(search, callback);
};
QuestModel = mongoose.model('Quest', QuestSchema);

module.exports.QuestModel = QuestModel;
module.exports.QuestSchema = QuestSchema;
