import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import { signOut } from '../../supabase';
import logo from '../../assets/logo.png';
import './styles.css';

const Header = ({ user }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  // Cuando se haga clic en "Registrarse" en el modal de login,
  // se cierra el modal de login y se abre el modal de registro.
  const handleOpenRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  return (
    <header className="header">   
      <h1>Réplica de Reddit</h1>
      <img src={logo} alt="Logo de Reddit" className="logo-icon" />
      <div className="search-bar">
        <input type="text" placeholder="Buscar en Reddit..." />
      </div>
      <nav>
        <Link to="/">Mensajes</Link>
        <Link to="/notification">Notificaciones</Link>
        {user ? (
          <>
            <Link to="/perfil">Perfil</Link>
            <button className="logout-btn" onClick={signOut}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            className="login-btn-header"
            onClick={() => setLoginOpen(true)}
          >
            Login/Registro
          </button>
        )}
      </nav>

      {/* Modal de Login se renderiza si isLoginOpen es true */}
      <Login
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        openRegister={handleOpenRegister}
      />

      {/* Modal de Registro se renderiza si isRegisterOpen es true */}
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </header>
  );
};

export default Header;