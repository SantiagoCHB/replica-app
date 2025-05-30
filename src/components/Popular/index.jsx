// src/components/Popular/index.jsx
import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Post from '../Post';
import PopularCommunities from '../PopularCommunities';
import './styles.css';

const Popular = ({ isLoggedIn }) => {
  // Datos de ejemplo para los posts en tendencia
  const trendingPosts = [
    {
      id: 1,
      image: "https://via.placeholder.com/400x200",
      title: "Tendencia 1",
      summary: "Resumen breve de la tendencia.",
      community: "r/ejemplo"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/400x200",
      title: "Tendencia 2",
      summary: "Resumen breve de la tendencia.",
      community: "r/ejemplo2"
    }
  ];

  return (
    <div className="popular-container">
      <div className="main-content">
        <Sidebar isLoggedIn={isLoggedIn} />
        <div className="popular-content">
          <section className="trending-section">
            <h2>Posts en Tendencia</h2>
            <div className="trending-posts-wrapper">
              {trendingPosts.map(post => (
                <div key={post.id} className="trending-post">
                  <div className="trending-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="trending-info">
                    <h3>{post.title}</h3>
                    <p className="trending-summary">{post.summary}</p>
                    <p className="trending-community">{post.community}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="posts-feed">
            <h2>Posts Recientes</h2>
            <Post />
            <Post />
          </section>
        </div>
        {/* Sidebar derecho: mostrará PopularCommunities solo si el usuario NO está logueado */}
        {!isLoggedIn && <PopularCommunities />}
      </div>
      <Footer />
    </div>
  );
};

export default Popular;