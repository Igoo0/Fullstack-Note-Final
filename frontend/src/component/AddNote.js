import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API } from "../utils";

function AddNote() {
    const [creator, setCreator] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    const saveNotes = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken"); // ambil token

            await API.post(
                "/notes", // sebaiknya endpoint untuk tambah notes konsisten, misal /notes
                {
                    tgl,
                    judul,
                    konten,
                },
            );
            navigate("/notes");
        } catch (error) {
            console.log(error);
            alert("Gagal menyimpan catatan. Coba login ulang jika perlu.");
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="box p-5">
                    <h1 className="title has-text-centered has-text-primary">Add New Note</h1>
                    <form onSubmit={saveNotes}>
                        <div className="field">
                            <label className="label">Creator</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input is-medium is-rounded"
                                    value={creator}
                                    onChange={(e) => setCreator(e.target.value)}
                                    placeholder="Enter creator name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input is-medium is-rounded"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Notes</label>
                            <div className="control">
                                <textarea
                                    className="textarea is-medium is-rounded"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows="4"
                                    placeholder="Write your notes here..."
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
    );
}

export default AddNote;
