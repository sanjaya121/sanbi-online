import { useState } from 'react';
import './App.css';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import { CartProvider, useCart } from './context/CartContext';

function InnerApp() {
	const [page, setPage] = useState<'products' | 'cart' | 'checkout' | 'thanks'>('products');
	const [orderId, setOrderId] = useState<string | null>(null);
	const { totalCount } = useCart();

	const getDataFromChild = (data: any) => {
		console.log('DATA Received', data);
	};

	return (
		<div style={{ padding: 20 }}>
			<nav style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
				<button onClick={() => setPage('products')}>Products</button>
				<button onClick={() => setPage('cart')}>Cart ({totalCount})</button>
				<button onClick={() => setPage('checkout')}>Checkout</button>
			</nav>
			{page === 'products' ? (
				<Products sendData={getDataFromChild} />
			) : page === 'cart' ? (
				<Cart onCheckout={() => setPage('checkout')} />
			) : page === 'checkout' ? (
				<Checkout
					onSuccess={(id) => {
						setOrderId(id);
						setPage('thanks');
					}}
					onCancel={() => setPage('cart')}
				/>
			) : (
				<OrderSuccess orderId={orderId ?? ''} onContinue={() => setPage('products')} />
			)}
		</div>
	);
}

function App() {
	return (
		<CartProvider>
			<InnerApp />
		</CartProvider>
	);
}

export default App;
