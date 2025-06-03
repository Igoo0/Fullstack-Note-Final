
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NoteList from "./components/NoteList";
import EditNotes from "./components/EditNote";
import AddNotes from "./components/AddNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notes" element={<NoteList/>} />
        <Route path="/add-notes" element={<AddNotes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-notes/:id" element={<EditNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
