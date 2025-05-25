import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navStyle = {
    backgroundColor: '#2d3748', // gray-800
    padding: '16px',
    display: 'flex',
  };

  const linkStyle = {
    color: 'white',
    marginRight: '24px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  };

  const hoverColor = '#ecc94b'; // yellow-300

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/time-tracking', label: 'Tracking' },
    { to: '/stats', label: 'Stats' },
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Signup' },
  ];

  return (
    <nav style={navStyle}>
      {links.map(({ to, label }, index) => (
        <Link
          key={to}
          to={to}
          style={{
            ...linkStyle,
            color: hoveredIndex === index ? hoverColor : 'white',
            marginRight: index === links.length - 1 ? 0 : '24px',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
