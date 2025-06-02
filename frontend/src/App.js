import {  BrowserRouter, Routes, Route} from "react-router-dom";
import NoteList from "./component/NoteList";
import AddNotes from "./component/AddNote";
import EditNotes from "./component/EditNote";
import React from "react";
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<NoteList/>}/>
    <Route path="add" element={<AddNotes/>}/>
    <Route path="edit/:id" element={<EditNotes/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;