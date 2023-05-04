const mongoose = require("mongoose");

// noteSchema
const noteSchema = mongoose.Schema({
  title: String,
  note: String,
  category: String,
  userID: String,
},
{
  versionKey:false
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  NoteModel,
};

// for testing purpose 
// {
//   "title": "Market items",
//   "note": "tomota,onian,lemon",
//   "category": "vegitables",
//   "userID": "market"
// }