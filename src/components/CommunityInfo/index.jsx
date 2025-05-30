import React, { useState, useEffect } from 'react';
import supabase from '../../supabase';
import './styles.css';

const CommunityInfo = ({ communityId, user }) => {
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!communityId) return;
    const fetchCommunity = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('comunidades')
        .select('*')
        .eq('id', communityId)
        .single();
      if (error) {
        console.error("Error al obtener la comunidad:", error.message);
      } else {
        setCommunity(data);
      }
      setLoading(false);
    };
    fetchCommunity();
  }, [communityId]);

  const handleJoin = async () => {
    if (!user) {
      alert("Debes iniciar sesión para unirte a la comunidad.");
      return;
    }
    // Inserta una membresía en la tabla 'membresias'
    const { error } = await supabase
      .from('membresias')
      .insert([{ user_id: user.id, comunidad_id: community.id }]);
    if (error) {
      alert("Error al unirse a la comunidad: " + error.message);
    } else {
      alert("Te has unido a la comunidad exitosamente.");
    }
  };

  if (loading)
    return <p className="community-info-loading">Cargando información de la comunidad...</p>;
  if (!community)
    return <p className="community-info-error">No se encontró la comunidad.</p>;

  return (
    <aside className="community-info">
      <div className="community-header">
        <h3>{`r/${community.nombre}`}</h3>
        <button className="join-btn" onClick={handleJoin}>Unirse</button>
      </div>
      <div className="community-stats">
        <p><strong>Miembros:</strong> 10K</p>
        <p><strong>Online:</strong> 1K</p>
        <p><strong>Visitas:</strong> 75%</p>
      </div>
      <ul className="community-rules">
        <li>Regla 1: No spam.</li>
        <li>Regla 2: Respeta a los demás.</li>
        <li>Regla 3: Publicaciones relevantes.</li>
      </ul>
      <img
        className="community-icon"
        src={community.icono_url || "https://via.placeholder.com/50"}
        alt="Icono de la comunidad"
      />
    </aside>
  );
};

export default CommunityInfo;