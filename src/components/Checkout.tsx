import { useState, type FormEvent } from 'react';
import { useCart, type CheckoutInfo } from '../context/CartContext';

const Checkout = ({ onSuccess, onCancel }: { onSuccess: (orderId: string) => void; onCancel?: () => void }) => {
  const { items, totalPrice, placeOrder } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!name || !email || !address) {
      setError('All fields are required');
      return false;
    }
    // simple email regex
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!re.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const info: CheckoutInfo = { name, email, address };
      const { orderId } = await placeOrder(info);
      onSuccess(orderId);
    } catch (err) {
      setError('Failed to place order. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {items.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          <div style={{ marginBottom: 16 }}>
            <h3>Order Summary</h3>
            <ul>
              {items.map((it) => (
                <li key={it.id} style={{ marginBottom: 8 }}>
                  {it.name} x {it.quantity} - ${(it.price * it.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <div style={{ fontWeight: 700 }}>Total: ${totalPrice.toFixed(2)}</div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Place order'}</button>
              {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
