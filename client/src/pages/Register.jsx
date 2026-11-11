import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { errorMessage } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div className="container section narrow">
      <h2>Create account</h2>
      <form className="form" onSubmit={submit}>
        <label>Name<input name="name" required value={form.name} onChange={change} /></label>
        <label>Email<input name="email" type="email" required value={form.email} onChange={change} /></label>
        <label>Password<input name="password" type="password" required minLength="6" value={form.password} onChange={change} /></label>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-dark">Register</button>
        <p className="note">Already registered? <Link to="/login"><u>Login</u></Link></p>
      </form>
    </div>
  );
}
