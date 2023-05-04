const express = require("express");
const { NoteModel } = require("../models/Notes.model");
const notesRouter = express.Router();
// GET Router
notesRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.send(notes);
  } catch (err) {
    console.log(err);
  }
});
// POST Router
notesRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send({ msg: "Your Note has been Created" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});
// PATCH Router
notesRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await NoteModel.find({ _id: id });
  const userID_in_note = note[0].userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You Are Not Authorised" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("Your note has updated successfully");
    }
  } catch (err) {
    res.send({ msg: "Something Went Wrong" });
  }
});
//DELETE Router
notesRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await NoteModel.findByIdAndDelete({_id: id});
    res.send("Your note has Deleted successfully");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});
module.exports = {
  notesRouter,
};