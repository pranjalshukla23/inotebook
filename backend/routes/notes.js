const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//fetch all notes - '/api/notes/fetchallnotes'
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    //find notes by user
    const notes = await Notes.find({
      user: req.user.id,
    });

    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

//add a note - '/api/notes/addnote'
router.post(
  "/addnote",
  fetchUser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Enter a description").isLength({ min: 5 }),
  body("tag", "Enter a tag").isLength({ min: 3 }),
  async (req, res) => {
    //if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      //create a new note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //save note in db
      const savedNote = await note.save();

      return res.status(200).json(savedNote);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
);

//update a note - '/api/notes/updatenote/:id'
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //create new note object
    const newNote = {};

    if (title) {
      newNote.title = title;
    }

    if (description) {
      newNote.description = description;
    }

    if (tag) {
      newNote.tag = tag;
    }

    //find note to be updated
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        error: "Not Found",
      });
    }

    //check if note belongs to user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        error: "Not allowed",
      });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: newNote,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

//delete a note - '/api/notes/deletenote/:id'
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //find note to be deleted
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        error: "Not Found",
      });
    }

    //check if note belongs to user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        error: "Not allowed",
      });
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;