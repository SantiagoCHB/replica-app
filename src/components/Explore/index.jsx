// src/components/Explore/index.jsx
import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './styles.css';

const Explore = ({ isLoggedIn }) => {
  const categories = [
    "Internet Culture",
    "Game",
    "Q&As & Stories",
    "Technology",
    "Music",
    "Sports"
  ];
  
  const communities = [
    { id: 1, name: "r/Internet", description: "La comunidad sobre cultura internet." },
    { id: 2, name: "r/Gaming", description: "Todo sobre videojuegos y más." },
    { id: 3, name: "r/Stories", description: "Anécdotas y relatos interesantes." },
    { id: 4, name: "r/Tech", description: "Innovación y tecnología." },
    { id: 5, name: "r/Music", description: "Comparte y descubre música." },
    { id: 6, name: "r/Sports", description: "Debate y noticias deportivas." }
  ];

  return (
    <div className="explore-container">
      <div className="main-content">
        <Sidebar isLoggedIn={isLoggedIn} />
        <div className="explore-content">
          <h2>Explorar Comunidades</h2>
          <div className="categories-bar">
            {categories.map((cat, index) => (
              <button key={index} className="category-btn">{cat}</button>
            ))}
          </div>
          <div className="communities-grid">
            {communities.map(community => (
              <div key={community.id} className="community-card">
                <div className="community-card-header">
                  <h3>{community.name}</h3>
                  <button className="join-btn">Unirse</button>
                </div>
                <p className="community-description">{community.description}</p>
              </div>
            ))}
          </div>
          <button className="show-more-btn">Mostrar más</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;