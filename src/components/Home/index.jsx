import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import RecentHistory from '../RecentHistory';
import Footer from '../Footer';
import Post from '../Post';
import './styles.css';

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="main-content">
      <Sidebar />
      <div className="content-area">
        <Post />
        <Post />
        {/* Puedes agregar más instancias de <Post /> aquí según necesites */}
      </div>
      <RecentHistory />
    </div>
    <Footer />
  </div>
);

export default Home;