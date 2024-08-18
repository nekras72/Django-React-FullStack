import '../styles/Note.css';
/* eslint-disable react/prop-types */
const Note = ({ note, onDelete }) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');
    return (
        <div className='note-container'>
            <p className='note-title'>{note.title}</p>
            <p className='note-content'>{note.content}</p>
            <p className='note-date'>{formattedDate}</p>
            <button className='note-button' onClick={onDelete}>
                Delete
            </button>
        </div>
    );
};

export default Note;
