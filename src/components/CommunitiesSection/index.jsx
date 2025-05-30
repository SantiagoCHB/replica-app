import React, { useState, useEffect } from 'react';
import supabase from '../../supabase';
import './styles.css';

const CommunitiesSection = ({ user }) => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Consulta de todas las comunidades
  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('comunidades')
        .select('id, nombre, descripcion, icono_url');
      if (error) {
        console.error("Error al obtener comunidades:", error.message);
      } else {
        setCommunities(data);
      }
      setLoading(false);
    };

    fetchCommunities();
  }, []);

  // Función para unirse a una comunidad
  const joinCommunity = async (communityId) => {
    if (!user) {
      alert("Debes iniciar sesión para unirte a una comunidad.");
      return;
    }
    const { error } = await supabase
      .from('membresias')
      .insert([{ user_id: user.id, comunidad_id: communityId }]);
    if (error) {
      alert("Error al unirse a la comunidad: " + error.message);
    } else {
      alert("Te has unido a la comunidad exitosamente.");
    }
  };

  return (
    <div className="communities-section">
      <hr />
      <h3>Comunidades de {user?.discord || "Usuario"}</h3>
      {loading ? (
        <p>Cargando comunidades...</p>
      ) : communities.length === 0 ? (
        <p>No hay comunidades disponibles.</p>
      ) : (
        communities.map((comm) => (
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
            <button
              className="join-btn"
              onClick={() => joinCommunity(comm.id)}
            >
              Unirse
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CommunitiesSection;