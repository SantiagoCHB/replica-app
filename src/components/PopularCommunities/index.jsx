import React from 'react';
import './styles.css';

const PopularCommunities = () => {
  const communities = [
    { name: "r/InternetCulture", members: "50K" },
    { name: "r/Gaming", members: "120K" },
    { name: "r/Technology", members: "80K" },
    { name: "r/Movies", members: "65K" },
    { name: "r/PopCulture", members: "40K" }
  ];

  return (
    <aside className="popular-communities">
      <h3>Comunidades Populares</h3>
      <ul>
        {communities.map((community, index) => (
          <li key={index}>
            <a href="#">{community.name}</a>
            <span>{community.members} miembros</span>
          </li>
        ))}
      </ul>
      <button className="see-more-btn">Ver más comunidades</button>
    </aside>
  );
};

export default PopularCommunities;