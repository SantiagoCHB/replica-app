import React from 'react';
import './styles.css';

const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/popular">Popular</a></li>
      <li><a href="/explore">Explore</a></li>
      <li><a href="/all">All</a></li>
    </ul>
  </aside>
);

export default Sidebar;