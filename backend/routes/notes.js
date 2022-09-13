const express=require('express');
const router=express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: get all the notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try {
        const notes=await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
      }
})

// ROUTE 2: add a new note using: POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body("title", "enter valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 character").isLength({
      min: 5,
    })
], async (req,res)=>{
    try {
        const {title, description,tag}=req.body;
        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note =new Note({
            title,description,tag,user: req.user.id
        })
        const savedNote= await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
      }
})

// ROUTE 3: update an existing note using: PUT "/api/notes/updatenote/:id". login required
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    const {title,description,tag}=req.body;

    // create a new note
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    // find the note to be updated & update it
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send('not found')}
    console.log(note);
    console.log(note.user);
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('not allowed');
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
})

module.exports=router;