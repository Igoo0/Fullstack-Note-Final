import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/notes");
      setNotes(response.data);
      setMsg("");
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            setMsg("Session expired. Please login again.");
            break;
          default:
            setMsg("Failed to fetch notes");
        }
      } else {
        setMsg("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotes = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await API.delete(`/notes/${id}`);
      setMsg("Note deleted successfully");
      getNotes(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error deleting note:", error);
      setMsg("Failed to delete note");
    }
  };

  const handleLogout = async () => {
    try {
      await API.delete("/logout", { withCredentials: true });
      localStorage.removeItem("accessToken");
      navigate("/"); // redirect ke halaman login
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };


  if (isLoading) {
    return (
      <div className="columns mt-5 is-centered">
        <div className="column is-half has-text-centered">
          <div className="box">
            <div className="is-loading">Loading notes...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        {/* Header with logout button */}
        <div className="level mb-4">
          <div className="level-left">
            <h1 className="title has-text-centered has-text-primary">📝 My Notes</h1>
          </div>
          <div className="level-right">
            <button 
              onClick={handleLogout}
              className="button is-danger is-outlined is-small"
            >
              <span className="icon">
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Success/Error messages */}
        {msg && (
          <div className={`notification ${msg.includes('successfully') || msg.includes('success') ? 'is-success' : 'is-danger'} is-light`}>
            <button 
              className="delete" 
              onClick={() => setMsg("")}
            ></button>
            {msg}
          </div>
        )}

        {/* Add new note button */}
        <div className="is-flex is-justify-content-space-between mb-4">
          <Link to="/add-notes" className="button is-success is-rounded">
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>Add New Note</span>
          </Link>
          <button 
            onClick={getNotes}
            className="button is-info is-outlined is-rounded"
          >
            <span className="icon">
              <i className="fas fa-sync-alt"></i>
            </span>
            <span>Refresh</span>
          </button>
        </div>

        {/* Notes table */}
        <div className="box">
          {notes.length > 0 ? (
            <table className="table is-striped is-fullwidth is-hoverable">
              <thead>
                <tr className="has-background-primary-light">
                  <th className="has-text-centered">No</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Date</th>
                  <th className="has-text-centered">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, index) => (
                  <tr key={note.id}>
                    <td className="has-text-centered">{index + 1}</td>
                    <td>
                      <strong>{note.judul || note.title}</strong>
                    </td>
                    <td>
                      <span className="content">
                        {(note.konten || note.notes)?.length > 50 
                          ? `${(note.konten || note.notes).substring(0, 50)}...` 
                          : note.konten || note.notes
                        }
                      </span>
                    </td>
                    <td>
                      {note.tgl ? new Date(note.tgl).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <div className="buttons is-centered">
                        <Link
                          to={`/edit-notes/${note.id}`}
                          className="button is-small is-info is-light is-rounded"
                        >
                          <span className="icon">
                            <i className="fas fa-edit"></i>
                          </span>
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => deleteNotes(note.id)}
                          className="button is-small is-danger is-light is-rounded"
                        >
                          <span className="icon">
                            <i className="fas fa-trash"></i>
                          </span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="has-text-centered py-6">
              <div className="content">
                <i className="fas fa-sticky-note fa-3x has-text-grey-light mb-3"></i>
                <h3 className="title is-5 has-text-grey">No notes found</h3>
                <p className="has-text-grey">Start by creating your first note!</p>
                <Link to="/add-notes" className="button is-primary is-rounded mt-3">
                  <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span>Create Your First Note</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
