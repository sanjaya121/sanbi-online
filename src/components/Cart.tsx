// React default import not required with the JSX transform
import { useCart } from '../context/CartContext';

const Cart = ({ onCheckout }: { onCheckout?: () => void }) => {
  const { items, updateQuantity, removeItem, clearCart, totalCount, totalPrice } = useCart();

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div>${item.price.toFixed(2)}</div>
                  <div>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '16px', fontWeight: 700 }}>
            Total Items: {totalCount}
            <br />
            Total Price: ${totalPrice.toFixed(2)}
          </div>

          <div style={{ marginTop: '12px', display: 'flex', gap: 12 }}>
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={() => onCheckout && onCheckout()}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
