import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api/userApi';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await fetchUsers();
    setUsers(res.data);
  };

  useEffect(() => { loadUsers(); }, []);

  const remove = async id => {
    if (window.confirm('Delete this user?')) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.Id}>
              <td>{u.Name}</td>
              <td>{u.Email}</td>
              <td>{u.Phone}</td>
              <td>
                <Link className="btn btn-sm btn-info me-2" to={`/view/${u.Id}`}>View</Link>
                <Link className="btn btn-sm btn-warning me-2" to={`/edit/${u.Id}`}>Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => remove(u.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;