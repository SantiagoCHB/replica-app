import React from 'react';
import './styles.css';

const RecentHistory = () => {
  const viewedPosts = [
    { id: 1, title: "Post visto 1", url: "/post/1" },
    { id: 2, title: "Post visto 2", url: "/post/2" },
    { id: 3, title: "Post visto 3", url: "/post/3" }
  ];

  return (
    <aside className="recent-history">
      <h3>Historial Reciente</h3>
      <ul>
        {viewedPosts.map(post => (
          <li key={post.id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RecentHistory;