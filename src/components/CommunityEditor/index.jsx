import React, { useState, useEffect } from 'react';
import supabase from '../../supabase';
import './styles.css';

const CommunityEditor = ({ isOpen, onClose, community, refreshCommunities }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    icono_url: ''
  });

  useEffect(() => {
    if (community) {
      setFormData({
        nombre: community.nombre || '',
        descripcion: community.descripcion || '',
        icono_url: community.icono_url || ''
      });
    }
  }, [community]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('comunidades')
      .update(formData)
      .eq('id', community.id);
    if (error) {
      alert("Error al actualizar la comunidad: " + error.message);
    } else {
      alert("Comunidad actualizada exitosamente");
      refreshCommunities();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay community-editor">
      <div className="modal-content community-editor-content">
        <h2>Editar Comunidad</h2>
        <form onSubmit={handleSubmit} className="community-editor-form">
          <label>Nombre de la Comunidad *</label>
          <input 
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
          <label>Icono URL</label>
          <input 
            type="text"
            name="icono_url"
            value={formData.icono_url}
            onChange={handleChange}
          />
          <button type="submit" className="update-btn">
            Actualizar Comunidad
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CommunityEditor;