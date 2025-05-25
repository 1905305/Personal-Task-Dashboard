import React, { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const items = [
    'Learn JavaScript',
    'Build a React App',
    'Write APIs',
    'Explore Node.js',
    'Master CSS',
  ];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 400, margin: '20px auto' }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
      />
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <li>No tasks found.</li>
        )}
      </ul>
    </div>
  );
}
