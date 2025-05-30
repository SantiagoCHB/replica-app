import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import EditProfile from '../EditProfile';
import CommunityCreator from '../CommunityCreator';
import CommunityEditor from '../CommunityEditor';
import CreatePost from '../CreatePost';
import PostEditor from '../PostEditor';
import supabase from '../../supabase';
import './styles.css';

const Profile = ({ user, refreshProfile, isLoggedIn }) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCommunityOpen, setCommunityOpen] = useState(false);
  const [isCommunityEditorOpen, setCommunityEditorOpen] = useState(false);
  const [communityToEdit, setCommunityToEdit] = useState(null);
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [isPostEditorOpen, setPostEditorOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  // Función para refrescar la lista de comunidades (basada en las membresías)
  const refreshCommunities = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('membresias')
      .select('comunidades(*)')
      .eq('user_id', user.id);
    if (error) {
      console.error("Error al obtener comunidades:", error.message);
    } else {
      const comms = data.map(m => m.comunidades);
      setCommunities(comms);
    }
  };

  // Función para refrescar los posts del usuario
  const refreshPosts = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .order('fecha_creacion', { ascending: false });
    if (error) {
      console.error("Error al obtener posts del usuario:", error.message);
    } else {
      setUserPosts(data);
    }
  };

  // Cargar comunidades y posts cuando el usuario cambie
  useEffect(() => {
    if (user) {
      refreshCommunities();
      refreshPosts();
    }
  }, [user]);

  // Función para eliminar una comunidad
  const handleDeleteCommunity = async (communityId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta comunidad? Esta acción es irreversible.")) return;
    const { error } = await supabase
      .from('comunidades')
      .delete()
      .eq('id', communityId);
    if (error) {
      alert("Error al eliminar la comunidad: " + error.message);
    } else {
      alert("Comunidad eliminada exitosamente");
      refreshCommunities();
    }
  };

  if (!user) {
    return <p className="profile-loading">Cargando perfil...</p>;
  }

  const redditName = user.discord || "Usuario desconocido";
  const redditFormatted = `u/${redditName.replace(/\s/g, '-').replace(/_/g, '-')}`;
  const profilePic = user.profile_pic ?? "https://via.placeholder.com/80";

  return (
    <div className="profile-container">
      <div className="main-content">
        <Sidebar isLoggedIn={isLoggedIn} />
        <div className="profile-content">
          <div className="profile-header">
            <img src={profilePic} alt="Foto de perfil" className="profile-img" />
            <div className="profile-info">
              <h2>{redditName}</h2>
              <p className="reddit-username">{redditFormatted}</p>
            </div>
            <div className="profile-actions">
              <button className="edit-btn" onClick={() => setEditOpen(true)}>
                Editar
              </button>
              <button className="create-community-btn" onClick={() => setCommunityOpen(true)}>
                Crear Comunidad
              </button>
            </div>
          </div>
          <div className="profile-nav">
            <button className="nav-btn">Overview</button>
            <button className="nav-btn">Posts</button>
            <button className="nav-btn">Comments</button>
            <button className="nav-btn">Saved</button>
            <button className="nav-btn">Hidden</button>
            <button className="nav-btn">Upvoted</button>
            <button className="nav-btn">Downvoted</button>
          </div>

          {/* Sección de Posts del usuario */}
          <div className="user-posts">
            <div className="posts-header">
              <h3>Posts de {redditName}</h3>
              <button className="create-post-btn" onClick={() => setCreatePostOpen(true)}>
                Crear Post
              </button>
            </div>
            {userPosts.length === 0 ? (
              <p>Este usuario aún no ha creado posts.</p>
            ) : (
              userPosts.map(post => (
                <div key={post.id} className="post-card">
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
                    <button className="btn upvote" onClick={(e) => { e.stopPropagation(); console.log("Voto a favor"); }}>
                      Votar bien
                    </button>
                    <button className="btn downvote" onClick={(e) => { e.stopPropagation(); console.log("Voto en contra"); }}>
                      Votar mal
                    </button>
                    {/* Botón para abrir el editor del post */}
                    <button
                      className="btn edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPostToEdit(post);
                        setPostEditorOpen(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn comments"
                      onClick={(e) => { e.stopPropagation(); console.log("Ver comentarios"); }}
                    >
                      Comentarios
                    </button>
                    <button
                      className="btn share"
                      onClick={(e) => { e.stopPropagation(); console.log("Compartir post"); }}
                    >
                      Compartir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sección de Comunidades */}
          <div className="profile-communities">
            <hr />
            <h3>Comunidades de {redditName}</h3>
            {communities.length === 0 ? (
              <p>Este usuario no pertenece a ninguna comunidad.</p>
            ) : (
              communities.map(comm => (
                <div key={comm.id} className="community-card">
                  <img
                    src={comm.icono_url || "https://via.placeholder.com/50"}
                    alt={comm.nombre}
                    className="community-icon"
                  />
                  <div className="community-info">
                    <h4>{comm.nombre}</h4>
                    <p>{comm.descripcion}</p>
                  </div>
                  {comm.user_id === user.id && (
                    <div className="community-actions">
                      <button onClick={() => {
                        setCommunityToEdit(comm);
                        setCommunityEditorOpen(true);
                      }}>
                        Editar
                      </button>
                      <button onClick={() => handleDeleteCommunity(comm.id)}>
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Modales */}
      <EditProfile
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        refreshProfile={refreshProfile}
      />
      <CommunityCreator
        isOpen={isCommunityOpen}
        onClose={() => {
          setCommunityOpen(false);
          refreshCommunities();
        }}
        user={user}
      />
      <CommunityEditor
        isOpen={isCommunityEditorOpen}
        onClose={() => setCommunityEditorOpen(false)}
        community={communityToEdit}
        refreshCommunities={refreshCommunities}
      />
      <CreatePost
        isOpen={isCreatePostOpen}
        onClose={() => setCreatePostOpen(false)}
        user={user}
      />
      <PostEditor
        isOpen={isPostEditorOpen}
        onClose={() => setPostEditorOpen(false)}
        post={postToEdit}
        user={user}
        refreshPosts={refreshPosts}
      />
    </div>
  );
};

export default Profile;