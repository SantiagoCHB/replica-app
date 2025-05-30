import React, { useState, useEffect } from 'react';
import supabase from '../../supabase';
import './styles.css';

const CreatePost = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    imagen_url: '',
    comunidad_id: ''
  });
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Consulta las comunidades a las que el usuario pertenece (a través de las membresías)
  useEffect(() => {
    if (!user) return;
    const fetchUserCommunities = async () => {
      const { data, error } = await supabase
        .from('membresias')
        .select('comunidades(*)')
        .eq('user_id', user.id);
      if (error) {
        console.error("Error al obtener comunidades del usuario:", error.message);
      } else {
        // Cada item de data tiene la propiedad "comunidades"
        const comms = data.map(m => m.comunidades);
        setCommunities(comms);
      }
    };

    fetchUserCommunities();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.contenido.trim() || !formData.comunidad_id) {
      alert("Por favor, llena los campos obligatorios.");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from('posts')
      .insert([{
        titulo: formData.titulo,
        contenido: formData.contenido,
        imagen_url: formData.imagen_url,
        user_id: user.id,
        comunidad_id: formData.comunidad_id
      }]);
    setLoading(false);
    if (error) {
      alert("Error al crear el post: " + error.message);
    } else {
      alert("Post creado exitosamente!");
      setFormData({
        titulo: '',
        contenido: '',
        imagen_url: '',
        comunidad_id: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay create-post-modal">
      <div className="modal-content create-post-content">
        <h2>Crear Post</h2>
        <form className="create-post-form" onSubmit={handleSubmit}>
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
          <label>Imagen URL</label>
          <input 
            type="text"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
          />
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
            {loading ? "Creando..." : "Crear Post"}
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CreatePost;