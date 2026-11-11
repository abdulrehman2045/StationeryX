import CrudPage from './CrudPage';

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'description', label: 'Description', type: 'textarea' }
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' }
];

export default function Categories() {
  return <CrudPage title="Categories" endpoint="/categories" fields={fields} columns={columns} />;
}
