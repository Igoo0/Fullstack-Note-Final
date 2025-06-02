import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function EditNote() {
    const [tgl, setTgl] = useState("");
    const [judul, setJudul] = useState("");
    const [konten, setKonten] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getNoteById = useCallback(async () => {
        try {

            const response = await axios.get(`https://notes-be111-751413038158.us-central1.run.app/notes/${id}`);

            setTgl(response.data.tgl);
            setJudul(response.data.judul);
            setKonten(response.data.konten);
        } catch (error) {
            console.log(error);
        }
    }, [id]); // Pastikan `id` menjadi dependensi

    useEffect(() => {
        getNoteById();
    }, [getNoteById]); // Masukkan `getNoteById` sebagai dependensi

    const updateNote = async (e) => {
        e.preventDefault();
        try {

            await axios.patch(`https://notes-be111-751413038158.us-central1.run.app/notes/${id}`, {

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
                    <h1 className="title has-text-centered has-text-info">✍🏻 Edit Note</h1>
                    <form onSubmit={updateNote}>
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
                                    placeholder="Masukkan Judul" 
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
                            <button type="submit" className="button is-info is-medium is-rounded px-5">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNote;
