import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "https://inotebook-backend.glitch.me";
    
    const [notes, setNotes] = useState([]); // State to hold the list of notes

    // Function to fetch all notes from the server
    const fetchNotes = async () => {
        // API call to fetch all notes
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const fetchedNotes = await response.json(); // Parsing the response JSON
        setNotes(fetchedNotes); // Updating the notes state with fetched notes
    }

    // Function to add a new note
    const addNote = async (title, description, tag) => {
        // API call to add a new note
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }) // Note details sent in the request body
        });

        const note = await response.json(); // Parsing the response JSON
        setNotes(notes.concat(note)) // Appending the newly created note to the notes state
    }

    // Function to delete a note
    const deleteNote = async (id) => {
        // API call to delete a note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        const json = await response.json(); // Parsing the response JSON

        // Filtering out the deleted note from the notes state
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes); // Updating the notes state with the filtered notes
    }

    // Function to edit a note
    const editNote = async (id, title, description, tag) => {
        // API call to edit a note
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }) // Updated note details sent in the request body
        });
        const json = await response.json(); // Parsing the response JSON

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic for editing in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNotes); // Updating the notes state with the modified note
    }
    return (
        <NoteContext.Provider value={{ notes,fetchNotes, addNote, deleteNote, editNote }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;


// The NoteState component is a context provider component that manages the state and functionality related to notes.
// The state variable notes is used to store the list of notes.
// The fetchNotes function makes an API call to fetch all notes from the server and updates the notes state with the fetched notes.
// The addNote function makes an API call to add a new note to the server and appends the newly created note to the notes state.
// The deleteNote function makes an API call to delete a note from the server and updates the notes state by removing the deleted note.
// The editNote function makes an API call to edit a note on the server and updates the notes state by modifying the corresponding note.
// The NoteState component wraps the props.children (child components) with the NoteContext.Provider component, providing the notes, fetchNotes, addNote, deleteNote, and editNote as the context values.
// The child components can access the provided context values using the useContext hook from the NoteContext.
// In summary, the NoteState component acts as a centralized state manager for notes, provides methods to interact with the server for CRUD operations on notes, and shares the state and functionality with its child components through the NoteContext

