import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">User Dashboard</Link>
        <div>
          <Link className="btn btn-light" to="/create">Add User</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;