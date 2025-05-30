import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import RecentHistory from '../RecentHistory';
import PopularCommunities from '../PopularCommunities';
import CommunitiesSection from '../CommunitiesSection';
import supabase from '../../supabase';
import './styles.css';

const Home = ({ isLoggedIn, user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('fecha_creacion', { ascending: false });
      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <div className="main-content">
        <Sidebar isLoggedIn={isLoggedIn} />
        <div className="content-area">
          {/* Sección de posts dinámicos */}
          {posts.length === 0 ? (
            <p>No hay posts disponibles.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-container">
                <Link to={`/post/${post.id}`} className="post-link">
                  <div className="post-content">
                    <h3>{post.titulo}</h3>
                    <p>{post.contenido.substring(0, 100)}...</p>
                  </div>
                  {post.imagen_url && (
                    <div className="post-image">
                      <img src={post.imagen_url} alt="Imagen del post" />
                    </div>
                  )}
                </Link>
                <div className="post-actions">
                  <button className="btn upvote" onClick={(e) => {e.stopPropagation(); console.log("Voto a favor");}}>
                    Votar bien
                  </button>
                  <button className="btn downvote" onClick={(e) => {e.stopPropagation(); console.log("Voto en contra");}}>
                    Votar mal
                  </button>
                  <button className="btn comments" onClick={(e) => {e.stopPropagation(); console.log("Comentarios");}}>
                    Comentarios
                  </button>
                  <button className="btn share" onClick={(e) => {e.stopPropagation(); console.log("Compartir post");}}>
                    Compartir
                  </button>
                </div>
              </div>
            ))
          )}

          
        </div>
        {/* Aquí se muestran RecentHistory y CommunitiesSection */}
          {isLoggedIn ? (
            <div className="post-extra">
              <RecentHistory />
              <CommunitiesSection user={user} />
            </div>
          ) : (
            <PopularCommunities />
          )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;