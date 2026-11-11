import { useEffect, useState } from 'react';
import api, { errorMessage } from '../../api';

const idOf = (value) => (value && typeof value === 'object' ? value._id : value);

export default function CrudPage({ title, endpoint, fields, columns, skipEmpty = [] }) {
  const [rows, setRows] = useState([]);
  const [options, setOptions] = useState({});
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.get(endpoint).then((res) => setRows(res.data));

  useEffect(() => {
    load();
    fields
      .filter((field) => field.optionsFrom)
      .forEach((field) =>
        api.get(field.optionsFrom).then((res) =>
          setOptions((current) => ({ ...current, [field.name]: res.data.map((row) => ({ value: row._id, label: row.name })) }))
        )
      );
  }, []);

  const openForm = (row) => {
    const values = {};
    fields.forEach((field) => {
      values[field.name] = row ? (field.type === 'password' ? '' : idOf(row[field.name]) ?? '') : field.default ?? '';
    });
    setForm({ id: row?._id, values });
    setError('');
  };

  const change = (field, e) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, values: { ...form.values, [field.name]: value } });
  };

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form.values };
    skipEmpty.forEach((key) => payload[key] === '' && delete payload[key]);
    try {
      if (form.id) await api.put(`${endpoint}/${form.id}`, payload);
      else await api.post(endpoint, payload);
      setForm(null);
      load();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const remove = async (row) => {
    if (!window.confirm('Delete this item permanently?')) return;
    try {
      await api.delete(`${endpoint}/${row._id}`);
      load();
    } catch (err) {
      alert(errorMessage(err));
    }
  };

  const renderField = (field) => {
    const value = form.values[field.name];
    if (field.type === 'textarea') return <textarea rows="3" value={value} onChange={(e) => change(field, e)} />;
    if (field.type === 'checkbox') return <input type="checkbox" checked={value} onChange={(e) => change(field, e)} />;
    if (field.type === 'select') {
      const list = field.options || options[field.name] || [];
      return (
        <select required value={value} onChange={(e) => change(field, e)}>
          <option value="">Select</option>
          {list.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      );
    }
    return <input type={field.type || 'text'} value={value} onChange={(e) => change(field, e)} />;
  };

  return (
    <>
      <div className="admin-head">
        <h2>{title}</h2>
        <button className="btn btn-dark" onClick={() => openForm(null)}>Add new</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => <th key={column.label}>{column.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id}>
                {columns.map((column) => <td key={column.label}>{column.render ? column.render(row) : row[column.key]}</td>)}
                <td className="actions">
                  <button className="btn btn-small" onClick={() => openForm(row)}>Edit</button>
                  <button className="btn btn-small btn-danger" onClick={() => remove(row)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty">Nothing here yet. Use Add new to create the first item.</p>}
      </div>

      {form && (
        <div className="modal" onClick={() => setForm(null)}>
          <form className="form modal-box" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h3>{form.id ? 'Edit' : 'Add'} {title.toLowerCase()}</h3>
            {fields.map((field) => (
              <label key={field.name} className={field.type === 'checkbox' ? 'inline' : ''}>
                {field.label}
                {renderField(field)}
              </label>
            ))}
            {error && <p className="error">{error}</p>}
            <div className="actions">
              <button className="btn btn-dark">Save</button>
              <button type="button" className="btn btn-small" onClick={() => setForm(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
