import '../styles/Home.css';
import { useEffect, useState } from 'react';
import { createNote, deleteNote, getNotes } from '../api';
import Note from '../components/Note';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    const getNotesCB = (data) => {
        setNotes(data);
    };

    const deleteNoteCB = (id) => {
        alert('Note was deleted!');
        setNotes((prev) => prev.filter((item) => item.id !== id));
    };

    const createNoteCB = (note) => {
        alert('Note created!');
        setContent('');
        setTitle('');
        setNotes((prev) => [...prev, note]);
    };

    useEffect(() => {
        getNotes(getNotesCB);
    }, []);

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.length > 0 &&
                    notes.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            onDelete={() => deleteNote(note.id, deleteNoteCB)}
                        />
                    ))}
                <form onSubmit={(e) => createNote(e, { title, content }, createNoteCB)}>
                    <label htmlFor='title'>Title:</label>
                    <br />
                    <input
                        type='text'
                        id='title'
                        name='title'
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <br />
                    <label htmlFor='content'>Content:</label>
                    <br />
                    <textarea
                        id='content'
                        name='content'
                        required
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                    <br />
                    <input type='submit' value='Submit' />
                </form>
            </div>
        </div>
    );
};

export default Home;
