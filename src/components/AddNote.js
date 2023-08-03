import React from 'react';
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';

export default function AddNote(props) {
    const { showAlert } = props;
    const context = useContext(noteContext);
    const { addNote } = context;

    // State to manage the note input fields
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    // Function to handle input changes and update the note state
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    // Function to handle the add note button click
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag); // Call the addNote function from the context
        setNote({ title: "", description: "", tag: "" }); // Reset the note state
        showAlert("Note added successfully", "success"); // Show success alert
    };

    return (
        <div className='my-5'>
            <h1>Add Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
}


// The AddNote component is a functional component that renders a form to add new notes.
// The showAlert prop is destructured from the props object. It is used to show an alert when a note is added successfully.
// The noteContext is imported from ../context/notes/noteContext. It represents the context object for notes.
// The useContext hook is used to access the note context and retrieve the addNote function.
// The useState hook is used to define the note state and a function to update it.
// The onChange function is called when an input field value changes. It updates the corresponding field in the note state.
// The handleClick function is called when the "Add Note" button is clicked. It calls the addNote function from the context, resets the note state, and shows a success alert using the showAlert function.
// The JSX code renders a form with input fields for title, description, and tag.
// The input fields are bound to the note state values and the onChange function is used to handle their changes.
// The "Add Note" button is disabled if the title has fewer than 3 characters