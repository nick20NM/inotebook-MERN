import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props)=>{
    const notesInitial=[
        {
          "_id": "6321d657c0d28a6592c97977",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:43.921Z",
          "__v": 0
        },
        {
          "_id": "6321d659c0d28a6592c97979",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:45.570Z",
          "__v": 0
        },
        {
          "_id": "6321d65ac0d28a6592c9797b",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:46.803Z",
          "__v": 0
        },
        {
          "_id": "6321d65bc0d28a6592c9797d",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:47.706Z",
          "__v": 0
        },
        {
          "_id": "6321d65cc0d28a6592c9797f",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:48.717Z",
          "__v": 0
        },
        {
          "_id": "6321d662c0d28a6592c97981",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:54.464Z",
          "__v": 0
        },
        {
          "_id": "6321d664c0d28a6592c97983",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:56.022Z",
          "__v": 0
        },
        {
          "_id": "6321d664c0d28a6592c97985",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:56.877Z",
          "__v": 0
        },
        {
          "_id": "6321d665c0d28a6592c97987",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:57.638Z",
          "__v": 0
        },
        {
          "_id": "6321d666c0d28a6592c97989",
          "user": "631f27b7d93be2d6ecd873a1",
          "title": "my title2",
          "description": "my description2",
          "tag": "personal2",
          "date": "2022-09-14T13:25:58.374Z",
          "__v": 0
        }
      ]
      const [notes,setNotes]=useState(notesInitial);

      // add a note
      const addNote= (title,description,tag)=>{
        // TODO API CALL
        console.log("adding a new note");
        const note={
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
      const deleteNote= ()=>{
        
      }

      // edit a note
      const editNote= ()=>{
        
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;