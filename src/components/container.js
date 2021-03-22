import React, {useState, useRef} from 'react';
import Input from "./input";
import NotesList from "./notes-list";

const Container = () => {

    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
    const inputRef = useRef();

    const refreshNotes = (notesList) => {
        setNotes([...notesList])
    }

    const onEdit = (data) => {
        inputRef.current.getEditNoteData(data)
    }

    return (
        <div className="container">
            <Input notes={notes} refresh={refreshNotes} ref={inputRef}/>
            <NotesList notes={notes} refresh={refreshNotes} onEdit={onEdit}/>
        </div>
    );
};

export default Container;
