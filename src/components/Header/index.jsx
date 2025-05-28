import React from 'react';
import './styles.css';

const Header = () => (
  <header className="header">
    <h1>Réplica de Reddit</h1>
    <nav>
      <a href="/">Mensajes</a>
      <a href="/notification">Notificaciones</a>
      <a href="/perfil">Perfil</a>
    </nav>
  </header>
);

export default Header;