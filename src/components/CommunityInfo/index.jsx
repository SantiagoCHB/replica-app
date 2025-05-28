import React from 'react';
import './styles.css';

const CommunityInfo = () => {
  return (
    <aside className="community-info">
      <div className="community-header">
        <h3>r/ejemplo</h3>
        <button className="join-btn">Unirse</button>
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
      <img className="community-icon" src="https://via.placeholder.com/50" alt="Icono de la comunidad" />
    </aside>
  );
};

export default CommunityInfo;