import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoteList from "./component/NoteList";
import AddNotes from "./component/AddNote";
import EditNotes from "./component/EditNote";
import Register from "./component/Register";
import Login from "./component/Login";
import React from "react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to notes if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return !token ? children : <Navigate to="/notes" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to notes */}
        <Route path="/" element={<Navigate to="/notes" replace />} />
        
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/notes" 
          element={
            <ProtectedRoute>
              <NoteList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-notes" 
          element={
            <ProtectedRoute>
              <AddNotes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-notes/:id" 
          element={
            <ProtectedRoute>
              <EditNotes />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/notes" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
