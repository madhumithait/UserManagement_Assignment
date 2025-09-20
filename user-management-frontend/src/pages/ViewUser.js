import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUser } from '../api/userApi';

function ViewUser() {
  const { id } = useParams();
  const [u, setU] = useState(null);

  useEffect(() => {
    fetchUser(id).then(res => setU(res.data));
  }, [id]);

  if (!u) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>User Details</h2>
      <dl className="row">
        {Object.entries({
          Name: u.Name, Email: u.Email, Phone: u.Phone,
          Company: u.Company, Street: u.Street,
          City: u.City, Zipcode: u.Zipcode,
          Latitude: u.Geo_Lat, Longitude: u.Geo_Lng
        }).map(([k,v]) => (
          <div className="col-sm-3" key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <Link className="btn btn-secondary" to="/">Back</Link>
    </div>
  );
}

export default ViewUser;