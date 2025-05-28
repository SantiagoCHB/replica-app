import React from 'react';
import './styles.css';

const RecentHistory = () => {
  const recentPosts = [
    { id: 1, title: "Post 1: Introducción a React", link: "/post/1" },
    { id: 2, title: "Post 2: Hooks en Profundidad", link: "/post/2" },
    { id: 3, title: "Post 3: Patrones de Componentes", link: "/post/3" },
  ];

  return (
    <aside className="recent-history">
      <h3>Historial Reciente</h3>
      <ul>
        {recentPosts.map(post => (
          <li key={post.id}>
            <a href={post.link}>{post.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RecentHistory;