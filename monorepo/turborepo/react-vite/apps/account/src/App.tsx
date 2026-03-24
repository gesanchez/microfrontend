import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { AccountList } from './pages/AccountList';
import { CreateAccount } from './pages/CreateAccount';

export default function App() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'German Sanchez', email: 'german.sanchez@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@acme.inc', status: 'pending' },
    { id: 3, name: 'Robert Fox', email: 'robert@design.co', status: 'active' },
  ]);

  const handleCreate = (newAccount: any) => {
    setAccounts([...accounts, newAccount]);
  };

  const handleDelete = (id: number) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };

  return (
    <Routes>
      <Route index element={<AccountList accounts={accounts} onDelete={handleDelete} />} />
      <Route path="new" element={<CreateAccount onCreate={handleCreate} />} />
    </Routes>
  );
}
