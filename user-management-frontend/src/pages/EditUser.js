import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, updateUser } from '../api/userApi';
import UserForm from '../components/UserForm';

function EditUser() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(res => {
      // map DB record to our form shape
      const { Name, Email, Phone, Company, Street, City, Zipcode, Geo_Lat, Geo_Lng } = res.data;
      setUser({ name: Name, email: Email, phone: Phone, company: Company, street: Street, city: City, zipcode: Zipcode, geo: { lat: Geo_Lat, lng: Geo_Lng } });
    });
  }, [id]);

  const handleUpdate = async data => {
    await updateUser(id, data);
    nav('/');
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      {user && <UserForm initialData={user} onSubmit={handleUpdate} />}
    </div>
  );
}

export default EditUser;