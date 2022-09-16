import React, { useState } from 'react'
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host='http://localhost:5000';
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

// get all notes
const getNotes = async () => {
  // api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZjI3YjdkOTNiZTJkNmVjZDg3M2ExIn0sImlhdCI6MTY2Mjk4OTMzNH0.ng-Hkv5RscTEgyzp9o_lqYRRJylQCkhRu35t6Mno6b0'
    }
  });

  const json=await response.json();
  console.log(json);
  setNotes(json);
}

  // add a note
  const addNote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZjI3YjdkOTNiZTJkNmVjZDg3M2ExIn0sImlhdCI6MTY2Mjk4OTMzNH0.ng-Hkv5RscTEgyzp9o_lqYRRJylQCkhRu35t6Mno6b0'
      },
      body: JSON.stringify(title,description,tag)
    });

    console.log("adding a new note");
    const note = {
      "_id": "6321d657c0d28a6592c97977",
      "user": "631f27b7d93be2d6ecd873a1",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-09-14T13:25:43.921Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  // delete a note
  const deleteNote = (id) => {
    // TODO API CALL
    console.log("deleting the note with id=" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZjI3YjdkOTNiZTJkNmVjZDg3M2ExIn0sImlhdCI6MTY2Mjk4OTMzNH0.ng-Hkv5RscTEgyzp9o_lqYRRJylQCkhRu35t6Mno6b0'
      },
      body: JSON.stringify(title,description,tag)
    });
    const json = response.json();

    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;