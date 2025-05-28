import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PostDetail from './components/PostDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        {/* Puedes agregar más rutas (por ejemplo: /notification, /perfil, etc.) */}
      </Routes>
    </Router>
  );
};

export default App;