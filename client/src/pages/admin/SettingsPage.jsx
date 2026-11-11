import { useEffect, useState } from 'react';
import api, { errorMessage } from '../../api';
import { useSettings } from '../../context/SettingsContext';

const fields = [
  ['siteName', 'Site name'],
  ['tagline', 'Tagline'],
  ['whatsapp', 'WhatsApp number (with country code, digits only)'],
  ['email', 'Contact email'],
  ['phone', 'Contact phone'],
  ['address', 'Address']
];

export default function SettingsPage() {
  const { settings, refresh } = useSettings();
  const [form, setForm] = useState({});
  const [status, setStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/settings', form);
      await refresh();
      setStatus({ type: 'success', text: 'Settings saved' });
    } catch (err) {
      setStatus({ type: 'error', text: errorMessage(err) });
    }
  };

  return (
    <>
      <h2>Website settings</h2>
      <form className="form narrow-form" onSubmit={submit}>
        {fields.map(([name, label]) => (
          <label key={name}>
            {label}
            <input value={form[name] || ''} onChange={(e) => setForm({ ...form, [name]: e.target.value })} />
          </label>
        ))}
        {status.text && <p className={status.type}>{status.text}</p>}
        <button className="btn btn-dark">Save settings</button>
      </form>
    </>
  );
}
