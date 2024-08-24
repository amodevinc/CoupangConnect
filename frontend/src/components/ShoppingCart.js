import React from 'react';

const ShoppingCartComponent = ({ userId }) => {
  // const {
  //   cart,
  //   loading,
  //   error,
  //   addItem,
  //   removeItem,
  //   updateItemQuantity,
  //   inviteUser,
  //   removeUser,
  //   completeCart,
  //   calculateTotal
  // } = use(userId);

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!cart) return <div>No active cart found.</div>;

  return (
    <div>
      <h2>Shared Shopping Cart</h2>
      {cart.items.map(item => (
        <div key={item.id}>
          <span>{item.name} - Quantity: {item.quantity}</span>
          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
          <button onClick={() => removeItem(item)}>Remove</button>
        </div>
      ))}
      <p>Total: ${calculateTotal()}</p>
      <button onClick={() => addItem({ id: 'newItem', name: 'New Item', price: 10, quantity: 1 })}>
        Add New Item
      </button>
      <button onClick={() => inviteUser('friendUserId')}>Invite Friend</button>
      <button onClick={completeCart}>Complete Cart</button>
    </div>
  );
};

export default ShoppingCartComponent;