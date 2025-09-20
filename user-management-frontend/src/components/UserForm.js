import { useState, useEffect } from 'react';

function UserForm({ initialData = {}, onSubmit }) {
  const [user, setUser] = useState({
    name: '', email: '', phone: '', company: '',
    street: '', city: '', zipcode: '',
    geo: { lat: '', lng: '' }, ...initialData
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!user.name) errs.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(user.email)) errs.email = 'Valid email required';
    if (!user.phone) errs.phone = 'Phone is required';
    // ...other field checks
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setUser({ ...user, geo: { ...user.geo, [name]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const submit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
    } else {
      onSubmit(user);
    }
  };

  return (
    <form onSubmit={submit}>
      {['name','email','phone','company','street','city','zipcode'].map(field => (
        <div className="mb-3" key={field}>
          <label className="form-label">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
          <input
            type="text"
            name={field}
            className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
            value={user[field]}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors[field]}</div>
        </div>
      ))}
      <div className="row">
        <div className="col">
          <label>Latitude</label>
          <input
            type="number" name="lat" step="0.000001"
            className={`form-control ${errors.lat ? 'is-invalid' : ''}`}
            value={user.geo.lat} onChange={handleChange}
          />
        </div>
        <div className="col">
          <label>Longitude</label>
          <input
            type="number" name="lng" step="0.000001"
            className={`form-control ${errors.lng ? 'is-invalid' : ''}`}
            value={user.geo.lng} onChange={handleChange}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3">Submit</button>
    </form>
  );
}

export default UserForm;