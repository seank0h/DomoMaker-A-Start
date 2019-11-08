const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

// Mongoose.Types.ObjectID is a funcation that converts string ID to real mongo ID

const convertID = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
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
    type:String,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
    min:0,
  }
});
// Static function to get the name and age from client
DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  questType: doc.questType,
  exp: doc.exp
});

// Find its owner
DomoSchema.statics.findbyOwner = (ownerId, callback) => {
  const search = {
    owner: convertID(ownerId),
  };
  return DomoModel.find(search).select('name age questType exp').exec(callback);
};
//Find by username and then edit.
//Find Quest By ID and delete
DomoSchema.statics.deleteOne=(name, callback) =>{
  const search = {
    name: name,
  };
  return DomoModel.findOneAndDelete(search,callback);

}
DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
