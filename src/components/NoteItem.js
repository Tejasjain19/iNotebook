import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Edit from '@mui/icons-material/Edit';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const { showAlert } = props;

    // Get the noteContext using the useContext hook
    const context = useContext(noteContext);
    const { deleteNote } = context;

    // Destructure the 'note' and 'updateNote' props from the 'props' object
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        {/* Render the note title */}
                        <h5 className="card-title">{note.title}</h5>
                        <div className="row">
                            {/* Icon for deleting the note */}
                            <div className='col-md-5' onClick={() => {
                                // Call the deleteNote function from noteContext and pass the note ID
                                deleteNote(note._id);
                                // Show alert when the note is deleted successfully
                                showAlert("Note deleted successfully", "success");
                            }}>
                                <DeleteOutlinedIcon />
                            </div>
                            {/* Icon for updating the note */}
                            <div className='col-md-5' onClick={() => {
                                // Call the updateNote function and pass the note object
                                updateNote(note);
                            }}>
                                <Edit />
                            </div>
                        </div>
                    </div>
                    {/* Render the note description */}
                    <p className="card-text"> {note.description}</p>
                </div>
            </div>
        </div>
    );
}


// The NoteItem component is a functional component that renders a single note item.
// The useContext hook is used to get the noteContext from the noteContext.
// The deleteNote function is extracted from the context.
// The note and updateNote props are destructured from the props object.
// The component returns JSX code that renders a card for each note item. It displays the note title, description, and icons for deleting and updating the note.
// When the delete icon is clicked, the deleteNote function is called from the noteContext, passing the note ID. It also shows an alert indicating that the note was deleted successfully.
// When the edit icon is clicked, the updateNote function is called, passing the note object.