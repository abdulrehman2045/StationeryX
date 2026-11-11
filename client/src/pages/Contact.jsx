import { useState } from 'react';
import api, { errorMessage } from '../api';
import { useSettings } from '../context/SettingsContext';

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/messages', form);
      setForm({ name: '', email: '', message: '' });
      setStatus({ type: 'success', text: 'Message sent. We will reply soon.' });
    } catch (err) {
      setStatus({ type: 'error', text: errorMessage(err) });
    }
  };

  return (
    <div className="container section contact">
      <div>
        <h2>Contact us</h2>
        <p>{settings.email}</p>
        <p>{settings.phone}</p>
        <p>{settings.address}</p>
      </div>
      <form className="form" onSubmit={submit}>
        <label>Name<input name="name" required value={form.name} onChange={change} /></label>
        <label>Email<input name="email" type="email" required value={form.email} onChange={change} /></label>
        <label>Message<textarea name="message" rows="5" required value={form.message} onChange={change} /></label>
        {status.text && <p className={status.type}>{status.text}</p>}
        <button className="btn btn-dark">Send message</button>
      </form>
    </div>
  );
}
