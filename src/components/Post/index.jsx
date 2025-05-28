import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Post = () => {
  // Para las acciones se pueden definir funciones (por ahora solo loguean en consola)
  const handleUpvote = (e) => {
    e.stopPropagation();
    console.log("Voto a favor");
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    console.log("Voto en contra");
  };

  const handleComments = (e) => {
    e.stopPropagation();
    console.log("Ver comentarios");
  };

  const handleShare = (e) => {
    e.stopPropagation();
    console.log("Compartir post");
  };

  return (
    <div className="post-container">
      <Link to="/post/1" className="post-link">
        <div className="post-content">
          <h3>Título del Post</h3>
          <p>
            Esta es una breve descripción del post. Se utiliza para resumir el contenido.
          </p>
        </div>
        <div className="post-image">
          <img src="https://via.placeholder.com/600x400" alt="Imagen del post" />
        </div>
      </Link>
      <div className="post-actions">
        <button className="btn upvote" onClick={handleUpvote}>Votar bien</button>
        <button className="btn downvote" onClick={handleDownvote}>Votar mal</button>
        <button className="btn comments" onClick={handleComments}>Comentarios</button>
        <button className="btn share" onClick={handleShare}>Compartir</button>
      </div>
    </div>
  );
};

export default Post;