import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const NoteList = () => {
const [notes, setNote] = useState([]);

useEffect(()=>{
    getNotes();
},[]);

const getNotes = async () =>{
    const response = await axios.get('https://notes-be111-751413038158.us-central1.run.app/notes');

    setNote(response.data);
};

const deleteNote = async (id) =>{
    try {
        await axios.delete(`https://notes-be111-751413038158.us-central1.run.app/notes/${id}`);

        getNotes();
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="columns mt-5 is-centered">
    <div className="column is-half">
      <h1 className="title has-text-centered has-text-primary"> Notes</h1>
      <div className="is-flex is-justify-content-space-between mb-4">
        <Link to={`add`} className="button is-success is-rounded">Add New</Link>
      </div>
      <table className="table is-striped is-fullwidth is-hoverable">
        <thead>
          <tr className="has-background-secondary-light">
            <th className="has-text-centered">No</th>
            <th>Tanggal</th>
            <th>Judul</th>
            <th>Catatan</th>
            <th className="has-text-centered">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((notes, index) => (
            <tr key={notes.id}>
              <td className="has-text-centered">{index + 1}</td>
              <td>{notes.tgl}</td>
              <td>{notes.judul}</td>
              <td>{notes.konten}</td>
              <td className="is-flex is-justify-content-center">
                <Link to={`edit/${notes.id}`} className="button is-small is-info is-light is-rounded mr-2">Edit</Link>
                <button 
                  onClick={() => deleteNote(notes.id)} 
                  className="button is-small is-danger is-light is-rounded"
                >
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default NoteList;
