import React from 'react';
import './styles.css';

const Sidebar = ({ isLoggedIn }) => {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/popular">Popular</a></li>
        {isLoggedIn && (
          <>
            <li><a href="/explore">Explore</a></li>
          </>
        )}
      </ul>
      <hr className="divider" />
      <h3>Topics</h3>
      <ul className="topics">
        <li><a href="#">Cultura de Internet</a></li>
        <li><a href="#">Juegos</a></li>
        <li><a href="#">Preguntas y respuestas</a></li>
        <li><a href="#">Tecnología</a></li>
        <li><a href="#">Cultura pop</a></li>
        <li><a href="#">Películas y TV</a></li>
      </ul>
      <hr className="divider" />
      <h3>Resources</h3>
      <ul className="resources">
        <li><a href="#">Acerca de Reddit</a></li>
        <li><a href="#">Anunciarse</a></li>
        <li><a href="#">Ayuda</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Empleo</a></li>
        <li><a href="#">Prensa</a></li>
      </ul>
      <hr className="divider" />
      <ul className="extras">
        <li><a href="#">Comunidades</a></li>
        <li><a href="#">Lo mejor de Reddit</a></li>
        <li><a href="#">Temas</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;