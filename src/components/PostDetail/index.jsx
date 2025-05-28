import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import CommunityInfo from '../CommunityInfo';
import Footer from '../Footer';
import './styles.css';

const PostDetail = () => {
  return (
    <div className="post-detail-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="detail-content">
          <h2>Título del Post Detallado</h2>
          <p>
            Publicado por <span className="post-author">UsuarioEjemplo</span>
          </p>
          <div className="post-body-text">
            <p>
              Aquí se muestra el contenido completo del post. Se ofrece una descripción detallada con toda la información relevante.
            </p>
          </div>
          <div className="post-image-detail">
            <img src="https://via.placeholder.com/600x400" alt="Imagen detallada del post" />
          </div>
          <div className="post-actions">
            <button className="btn upvote">Votar bien</button>
            <button className="btn downvote">Votar mal</button>
            <button className="btn comments">Comentarios</button>
            <button className="btn share">Compartir</button>
          </div>
          {/* Sección de comentarios */}
          <div className="comments-section">
            <h3>Comentarios</h3>
            <p>No hay comentarios aún.</p>
            {/* Aquí se podrían mapear y renderizar los comentarios en el futuro */}
          </div>
        </div>
        <CommunityInfo />
      </div>
      <Footer />
    </div>
  );
};

export default PostDetail;