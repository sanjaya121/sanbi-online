import { useCallback, useState } from 'react';
import './App.css';
import Products from './components/Products';

function App() {
	const [count, setCount] = useState(0);

	const getDataFromChild = (data) => {
		console.log('DATA Received', data);
	};

	return (
		console.log(' App component'),
		(
			<>
				<Products sendData={getDataFromChild} />
			</>
		)
	);
}

export default App;
