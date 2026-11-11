import CrudPage from './CrudPage';

const roles = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' }
];

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password (leave blank to keep current)', type: 'password' },
  { name: 'role', label: 'Role', type: 'select', options: roles, default: 'user' },
  { name: 'active', label: 'Active', type: 'checkbox', default: true }
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { label: 'Status', render: (row) => (row.active ? 'Active' : 'Disabled') }
];

export default function Users() {
  return <CrudPage title="Users" endpoint="/users" fields={fields} columns={columns} skipEmpty={['password']} />;
}
