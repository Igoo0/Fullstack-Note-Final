import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils"; // pastikan ini sudah ada

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

 
  const getNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }

      const response = await API.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setNotes(response.data);
      setMsg("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        setMsg("Akses ditolak. Silakan login ulang.");
      } else if (error.response && error.response.status === 401) {
        setMsg("Token tidak valid atau sudah kadaluwarsa. Silakan login ulang.");
      } else {
        setMsg("Gagal mengambil data catatan");
      }
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

  const deleteNotes = async (id) => {
    try {
      await API.delete(`/notes/${id}`, { withCredentials: true });
      getNotes();
    } catch (error) {
      console.error(error);
      setMsg("Gagal menghapus catatan");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h1 className="title has-text-centered has-text-primary">Notes</h1>
        {msg && <p className="has-text-danger has-text-centered">{msg}</p>}
        <div className="is-flex is-justify-content-space-between mb-4">
          <Link to="/add-notes" className="button is-success is-rounded">
            Add New
          </Link>
        </div>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr className="has-background-primary-light">
              <th className="has-text-centered">No</th>
              <th>Creator</th>
              <th>Title</th>
              <th>Notes</th>
              <th className="has-text-centered">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <tr key={note.id}>
                  <td className="has-text-centered">{index + 1}</td>
                  <td>{note.creator}</td>
                  <td>{note.title}</td>
                  <td>{note.notes}</td>
                  <td className="is-flex is-justify-content-center">
                    <Link
                      to={`/edit-notes/${note.id}`}
                      className="button is-small is-info is-light is-rounded mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteNotes(note.id)}
                      className="button is-small is-danger is-light is-rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="has-text-centered">
                  Tidak ada catatan
                </td>
              </tr>
            )}
          </tbody>
        </table>
       <button
        onClick={handleLogout}
        className="button is-danger is-rounded mt-5 is-fullwidth"
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default NoteList;
