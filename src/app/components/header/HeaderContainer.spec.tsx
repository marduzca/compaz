import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  it('renders all menu items', () => {
    render(<HeaderContainer />);

    expect(screen.getByText('DROPDOWN')).toBeInTheDocument();
    expect(screen.getByText('Historial')).toBeInTheDocument();
    expect(screen.getByText('Como instalar')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Quienes somos')).toBeInTheDocument();
  });
});
