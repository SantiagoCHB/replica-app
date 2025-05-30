import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase';
import './styles.css';

const CommunityCreator = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    icono_url: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      alert("El nombre de la comunidad es obligatorio.");
      return;
    }

    setLoading(true);

    // Inserción en la tabla "comunidades"
    const { data: comunidadData, error: comunidadError } = await supabase
      .from('comunidades')
      .insert([{
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        icono_url: formData.icono_url,
        user_id: user.id
      }])
      .select();

    if (comunidadError) {
      setLoading(false);
      alert("Error al crear la comunidad: " + comunidadError.message);
      return;
    }

    const nuevaComunidad = comunidadData[0];

    // Insertamos la membresía del creador en la tabla "membresias"
    const { error: membresiaError } = await supabase
      .from('membresias')
      .insert([{
        user_id: user.id,
        comunidad_id: nuevaComunidad.id
      }]);

    setLoading(false);

    if (membresiaError) {
      alert("Comunidad creada, pero hubo un error al unirse: " + membresiaError.message);
    } else {
      alert("Comunidad creada exitosamente");
      // Se puede redirigir o limpiar el formulario, según se requiera.
      setFormData({
        nombre: '',
        descripcion: '',
        icono_url: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay community-modal">
      <div className="modal-content community-modal-content">
        <h2>Crear Comunidad</h2>
        <form className="community-form" onSubmit={handleSubmit}>
          <label>Nombre de la Comunidad *</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la Comunidad"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <label>Descripción</label>
          <textarea
            name="descripcion"
            placeholder="Descripción de la comunidad"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
          <label>Icono URL</label>
          <input
            type="text"
            name="icono_url"
            placeholder="URL del icono de la comunidad"
            value={formData.icono_url}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Comunidad"}
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CommunityCreator;