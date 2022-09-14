import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props)=>{
    const state1={
        "name":"tom",
        "age":"25"
    }
    const [state,setState]=useState(state1);
    const update= ()=>{
        setTimeout(() => {
            setState({
                "name":"jerry",
                "age":"50"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;