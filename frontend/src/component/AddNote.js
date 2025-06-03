import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { API } from "../utils";

function AddNotes() {
    const [judul, setJudul] = useState("");
    const [konten, setKonten] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveNotes = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMsg("");

        try {
            await API.post('/notes', {
                judul,
                konten,
                tgl: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
            });
            
            setMsg("Note created successfully! Redirecting...");
            
            // Clear form
            setJudul("");
            setKonten("");
            
            // Redirect after short delay
            setTimeout(() => {
                navigate("/notes");
            }, 1500);
        } catch (error) {
            console.error("Error saving note:", error);
            if (error.response) {
                setMsg(error.response.data.msg || "Failed to save note");
            } else {
                setMsg("Network error. Please check your connection.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="box p-5">
                    {/* Header with back button */}
                    <div className="level mb-4">
                        <div className="level-left">
                            <h1 className="title has-text-centered has-text-primary">✏️ Add New Note</h1>
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

                    <form onSubmit={saveNotes}>
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
                                    className={`button is-success is-medium is-rounded px-5 ${isLoading ? 'is-loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    <span className="icon">
                                        <i className="fas fa-save"></i>
                                    </span>
                                    <span>{isLoading ? 'Saving...' : 'Save Note'}</span>
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

export default AddNotes;
