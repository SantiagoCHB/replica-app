import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import CommunityInfo from '../CommunityInfo';
import Footer from '../Footer';
import supabase from '../../supabase';
import './styles.css';

const PostDetail = ({ user }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [authorName, setAuthorName] = useState("Usuario desconocido");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      
      // Obtener el post
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (postError || !postData) {
        console.error("Error al obtener el post:", postError?.message);
        setLoading(false);
        return;
      }
      
      setPost(postData);

      // Obtener el nombre de Reddit del autor
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('discord')
        .eq('id', postData.user_id)
        .single();
      
      if (!userError && userData) {
        setAuthorName(userData.discord || "Usuario desconocido");
      }

      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Cargando post...</p>;
  if (!post) return <p>No se encontró el post.</p>;

  return (
    <div className="post-detail-container">
      <div className="main-content">
        <Sidebar />
        <div className="detail-content">
          <h2>{post.titulo}</h2>
          <p>Publicado por <span className="post-author">{authorName}</span></p>
          <div className="post-body-text">
            <p>{post.contenido}</p>
          </div>
          {post.imagen_url && (
            <div className="post-image-detail">
              <img src={post.imagen_url} alt="Imagen del post" />
            </div>
          )}
          <div className="post-actions">
            <button className="btn upvote">Votar bien</button>
            <button className="btn downvote">Votar mal</button>
            <button className="btn comments">Comentarios</button>
            <button className="btn share">Compartir</button>
          </div>
          <div className="comments-section">
            <h3>Comentarios</h3>
            <p>No hay comentarios aún.</p>
          </div>
        </div>
        <CommunityInfo communityId={post.comunidad_id} user={user} />
      </div>
      <Footer />
    </div>
  );
};

export default PostDetail;