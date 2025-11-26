import React from 'react';

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

const Products = ({ sendData }) => {
	console.log('Rendering Products component');
	return (
		<div>
			<h2>Products</h2>
			<button onClick={() => sendData('hello parent')}>Send Data</button>
		</div>
	);
};

export default Products;
