import React, { useState } from 'react';
import { useSharedCart } from '../hooks/useSharedCart';

const SharedCartDashboard = ({ userId }) => {
  const {
    cart,
    loading,
    error,
    addItem,
    removeItem,
    updateItemQuantity,
    inviteUser,
    removeUser,
    completeCart,
    calculateTotal
  } = useSharedCart(userId);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  if (loading) return <div className="text-center p-4">Loading cart...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error.message}</div>;
  if (!cart) return <div className="text-center p-4">No active cart found.</div>;

  const handleAddItem = () => {
    if (newItemName && newItemPrice) {
      addItem({
        id: Date.now().toString(),
        name: newItemName,
        price: parseFloat(newItemPrice),
        quantity: 1
      });
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const handleInviteUser = () => {
    if (inviteEmail) {
      inviteUser(inviteEmail);
      setInviteEmail('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Shopping Cart Dashboard</h1>
      
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Cart Info</h2>
        <p>Cart ID: {cart.id}</p>
        <p>Creator: {cart.creator}</p>
        <p>Status: {cart.status}</p>
        <p>Created At: {cart.createdAt?.toDate().toLocaleString()}</p>
        <p>Updated At: {cart.updatedAt?.toDate().toLocaleString()}</p>
      </div>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
        {cart.items.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b py-2">
            <span>{item.name} - ${item.price} x {item.quantity}</span>
            <div>
              <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">-</button>
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">+</button>
              <button onClick={() => removeItem(item)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </div>
          </div>
        ))}
        <p className="mt-2 font-bold">Total: ${calculateTotal().toFixed(2)}</p>
      </div>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Item</h2>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item Name"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 mr-2"
        />
        <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
      </div>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
        <h3 className="font-semibold">Current Members:</h3>
        <ul className="list-disc list-inside mb-2">
          {cart.members.map(member => (
            <li key={member}>
              {member}
              {member !== cart.creator && (
                <button onClick={() => removeUser(member)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Remove</button>
              )}
            </li>
          ))}
        </ul>
        <input
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="User Email"
          className="border p-2 mr-2"
        />
        <button onClick={handleInviteUser} className="bg-blue-500 text-white px-4 py-2 rounded">Invite User</button>
      </div>

      <div className="text-center">
        <button onClick={completeCart} className="bg-purple-500 text-white px-6 py-3 rounded text-lg">Complete Cart</button>
      </div>
    </div>
  );
};

export default SharedCartDashboard;