import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/userApi';
import UserForm from '../components/UserForm';

function CreateUser() {
  const nav = useNavigate();

  const handleCreate = async data => {
    await createUser(data);
    nav('/');
  };

  return (
    <div className="container">
      <h2>Add New User</h2>
      <UserForm onSubmit={handleCreate} />
    </div>
  );
}

export default CreateUser;