import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function AddNote() {
    const [tgl, setTgl] = useState("");
    const [judul, setJudul] = useState("");
    const[konten, setKonten] = useState("");
    const navigate = useNavigate();

    const saveNote = async (e) =>{
        e.preventDefault();
        try {

            await axios.post('https://note-abed-559917148272.us-central1.run.app/notes',{
                tgl,
                judul,
                konten
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="columns mt-5 is-centered">
    <div className="column is-half">
      <div className="box p-5">
        <h1 className="title has-text-centered has-text-primary"> Add New Note</h1>
        <form onSubmit={saveNote}>
          <div className="field">
            <label className="label">Tanggal</label>
            <div className="control">
              <input 
                type="date" 
                className="input is-medium is-rounded" 
                value={tgl} 
                onChange={(e) => setTgl(e.target.value)}
                placeholder="Tanggal" 
                required
              />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Judul</label>
            <div className="control">
              <input 
                type="text" 
                className="input is-medium is-rounded" 
                value={judul} 
                onChange={(e) => setJudul(e.target.value)} 
                placeholder="Judul" 
                required
              />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Isi</label>
            <div className="control">
              <textarea 
                className="textarea is-medium is-rounded"
                value={konten} 
                onChange={(e) => setKonten(e.target.value)} 
                rows="4" 
                placeholder="Tulis catatan disini" 
                required
              ></textarea>
            </div>
          </div>
  
          <div className="field has-text-centered">
            <button type="submit" className="button is-success is-medium is-rounded px-5">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default AddNote;
