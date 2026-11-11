import CrudPage from './CrudPage';
import { money } from '../../api';

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'category', label: 'Category', type: 'select', optionsFrom: '/categories' },
  { name: 'price', label: 'Price (Rs)', type: 'number' },
  { name: 'stock', label: 'Stock', type: 'number', default: 0 },
  { name: 'image', label: 'Image URL' },
  { name: 'description', label: 'Description', type: 'textarea' }
];

const columns = [
  { key: 'name', label: 'Name' },
  { label: 'Category', render: (row) => row.category?.name },
  { label: 'Price', render: (row) => money(row.price) },
  { key: 'stock', label: 'Stock' }
];

export default function Products() {
  return <CrudPage title="Products" endpoint="/products" fields={fields} columns={columns} />;
}
