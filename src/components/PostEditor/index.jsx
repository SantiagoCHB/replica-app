import React, { useState, useEffect } from 'react';
import supabase from '../../supabase';
import './styles.css';

const PostEditor = ({ isOpen, onClose, post, user, refreshPosts }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    comunidad_id: ''
  });
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cuando se carga el post, inicializamos el formulario
  useEffect(() => {
    if (post) {
      setFormData({
        titulo: post.titulo || '',
        contenido: post.contenido || '',
        comunidad_id: post.comunidad_id || ''
      });
    }
  }, [post]);

  // Consultar las comunidades a las que el usuario pertenece (mediante la tabla de membresías)
  useEffect(() => {
    if (!user) return;
    const fetchUserCommunities = async () => {
      const { data, error } = await supabase
        .from('membresias')
        .select('comunidades(*)')
        .eq('user_id', user.id);
      if (error) {
        console.error("Error al obtener comunidades:", error.message);
      } else {
        // Extraemos la propiedad “comunidades” de cada membresía
        const comms = data.map(m => m.comunidades);
        setCommunities(comms);
      }
    };

    fetchUserCommunities();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para actualizar el post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('posts')
      .update({
        titulo: formData.titulo,
        contenido: formData.contenido,
        comunidad_id: formData.comunidad_id
      })
      .eq('id', post.id);
    setLoading(false);
    if (error) {
      alert("Error al actualizar el post: " + error.message);
    } else {
      alert("Post actualizado exitosamente!");
      refreshPosts();
      onClose();
    }
  };

  // Función para eliminar el post
  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este post? Esta acción es irreversible.")) return;
    setLoading(true);
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', post.id);
    setLoading(false);
    if (error) {
      alert("Error al eliminar el post: " + error.message);
    } else {
      alert("Post eliminado exitosamente!");
      refreshPosts();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay post-editor-modal">
      <div className="modal-content post-editor-content">
        <h2>Editar Post</h2>
        <form className="post-editor-form" onSubmit={handleSubmit}>
          <label>Título *</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />

          <label>Contenido *</label>
          <textarea
            name="contenido"
            value={formData.contenido}
            onChange={handleChange}
            required
          ></textarea>

          <label>Selecciona Comunidad *</label>
          <select
            name="comunidad_id"
            value={formData.comunidad_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona --</option>
            {communities.map(comm => (
              <option key={comm.id} value={comm.id}>
                {comm.nombre}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
        <button className="delete-btn" onClick={handleDelete} disabled={loading}>
          Eliminar Post
        </button>
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PostEditor;