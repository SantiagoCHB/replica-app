// Ejemplo modificado para App.jsx (o el componente que administre la sesión)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Popular from './components/Popular';
import Explore from './components/Explore';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';
import Header from './components/Header';
import Administrator from './components/Administrator';
import supabase from './supabase';

const App = () => {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    async function getUserProfile() {
      // Obtener la sesión (que contiene el usuario de auth)
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error al obtener la sesión:", sessionError);
        return;
      }
      const authUser = sessionData.session?.user;
      if (authUser) {
        // Ahora consultamos la tabla Usuarios para obtener la información compleja
        const { data: profile, error: profileError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', authUser.id)
          .single();
        if (profileError) {
          console.error("Error al obtener datos del perfil:", profileError);
          // Con fallback, se podría usar authUser, pero éste no tiene los campos personalizados.
          setUser(authUser);
        } else {
          setUser(profile);
        }
      } else {
        setUser(null);
      }
    }
    getUserProfile();

    // Escuchar cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        getUserProfile();
      } else {
        setUser(null);
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/popular" element={<Popular isLoggedIn={isLoggedIn} />} />
        <Route path="/explore" element={<Explore isLoggedIn={isLoggedIn} />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/perfil" element={<Profile user={user} isLoggedIn={isLoggedIn} />} />
        <Route path="/administrator" element={<Administrator />} />
      </Routes>
    </Router>
  );
};

export default App;