// React default import not required with the JSX transform
import { useCart } from '../context/CartContext';

interface Product {
	id: number;
	name: string;
	price: number;
}

const products: Product[] = [
	{ id: 1, name: 'Product A', price: 29.99 },
	{ id: 2, name: 'Product B', price: 49.99 },
	{ id: 3, name: 'Product C', price: 19.99 },
];

const Products = ({ sendData }: { sendData?: (data: any) => void }) => {
	console.log('Rendering Products component');
	const { addItem } = useCart();
	return (
		<div>
			<h2>Products</h2>
			<button onClick={() => sendData && sendData('hello parent')}>Send Data</button>
			<ul>
				{products.map((p) => (
					<li key={p.id} style={{ marginBottom: 12 }}>
						<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
							<div style={{ fontWeight: 600 }}>{p.name}</div>
							<div>${p.price.toFixed(2)}</div>
							<div>
								<button onClick={() => addItem(p)}>Add to cart</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Products;
