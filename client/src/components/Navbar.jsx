import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex gap-6">
      <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
      <Link to="/tasks" className="text-white hover:text-yellow-300">Tasks</Link>
      <Link to="/time-tracking" className="text-white hover:text-yellow-300">Tracking</Link>
      <Link to="/stats" className="text-white hover:text-yellow-300">Stats</Link>
    </nav>
  );
}
