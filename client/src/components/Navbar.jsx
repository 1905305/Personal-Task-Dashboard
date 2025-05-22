import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/tasks" style={styles.link}>Tasks</Link>
      <Link to="/time-tracking" style={styles.link}>Tracking</Link>
      <Link to="/stats" style={styles.link}>Stats</Link>
    </nav>
  );
}

const styles = {
  nav: {
    padding: '1rem',
    background: '#282c34',
    display: 'flex',
    gap: '1rem'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
};
