import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';
import React from 'react';

test('renders hello message', () => {
    render(React.createElement(App));
    const helloElement = screen.getByText(/Hello/i);
    expect(helloElement).toBeInTheDocument();
});