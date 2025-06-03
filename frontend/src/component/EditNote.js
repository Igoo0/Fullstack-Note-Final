import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { API } from "../utils";

function EditNotes() {
    const [judul, setJudul] = useState("");
    const [konten, setKonten] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getNoteById();
    }, []);

    const updateNote = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMsg("");

        try {
            await API.patch(`/notes/${id}`, {
                judul,
                konten
            });

            setMsg("Note updated successfully! Redirecting...");
            
            // Redirect after short delay
            setTimeout(() => {
                navigate("/notes");
            }, 1500);
        } catch (error) {
            console.error("Error updating note:", error);
            if (error.response) {
                setMsg(error.response.data.msg || "Failed to update note");
            } else {
                setMsg("Network error. Please check your connection.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getNoteById = async () => {
        try {
            setIsLoadingData(true);
            const response = await API.get(`/notes/${id}`);
            
            if (response.data) {
                setJudul(response.data.judul || response.data.title || "");
                setKonten(response.data.konten || response.data.notes || "");
            } else {
                setMsg("Note not found");
            }
        } catch (error) {
            console.error("Error fetching note:", error);
            if (error.response?.status === 404) {
                setMsg("Note not found");
            } else {
                setMsg("Failed to load note data");
            }
        } finally {
            setIsLoadingData(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="columns mt-5 is-centered">
                <div className="column is-half">
                    <div className="box has-text-centered">
                        <div className="is-loading">Loading note data...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="box p-5">
                    {/* Header with back button */}
                    <div className="level mb-4">
                        <div className="level-left">
                            <h1 className="title has-text-centered has-text-info">✏️ Edit Note</h1>
                        </div>
                        <div className="level-right">
                            <Link to="/notes" className="button is-light is-rounded">
                                <span className="icon">
                                    <i className="fas fa-arrow-left"></i>
                                </span>
                                <span>Back to Notes</span>
                            </Link>
                        </div>
                    </div>

                    {/* Success/Error messages */}
                    {msg && (
                        <div className={`notification ${msg.includes('successfully') ? 'is-success' : 'is-danger'} is-light`}>
                            <button 
                                className="delete" 
                                onClick={() => setMsg("")}
                            ></button>
                            {msg}
                        </div>
                    )}

                    <form onSubmit={updateNote}>
                        <div className="field">
                            <label className="label">
                                <span className="icon-text">
                                    <span className="icon">
                                        <i className="fas fa-heading"></i>
                                    </span>
                                    <span>Title</span>
                                </span>
                            </label>
                            <div className="control has-icons-left">
                                <input
                                    type="text"
                                    className="input is-medium is-rounded"
                                    value={judul}
                                    onChange={(e) => setJudul(e.target.value)}
                                    placeholder="Enter note title"
                                    required
                                    disabled={isLoading}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-heading"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                <span className="icon-text">
                                    <span className="icon">
                                        <i className="fas fa-align-left"></i>
                                    </span>
                                    <span>Content</span>
                                </span>
                            </label>
                            <div className="control">
                                <textarea
                                    className="textarea is-medium is-rounded"
                                    value={konten}
                                    onChange={(e) => setKonten(e.target.value)}
                                    rows="6"
                                    placeholder="Write your note content here..."
                                    required
                                    disabled={isLoading}
                                ></textarea>
                            </div>
                            <p className="help">
                                Character count: {konten.length}
                            </p>
                        </div>

                        <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                                <button 
                                    type="submit" 
                                    className={`button is-info is-medium is-rounded px-5 ${isLoading ? 'is-loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    <span className="icon">
                                        <i className="fas fa-save"></i>
                                    </span>
                                    <span>{isLoading ? 'Updating...' : 'Update Note'}</span>
                                </button>
                            </div>
                            <div className="control">
                                <Link 
                                    to="/notes" 
                                    className="button is-light is-medium is-rounded px-5"
                                >
                                    <span className="icon">
                                        <i className="fas fa-times"></i>
                                    </span>
                                    <span>Cancel</span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNotes;
