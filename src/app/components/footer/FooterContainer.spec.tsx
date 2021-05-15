import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterContainer from './FooterContainer';

describe('FooterContainer', () => {
  it('renders all footer items', () => {
    render(<FooterContainer />);

    expect(
      screen.getByText('Tu guía para saber como llegar')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Planea la duración de tu viaje')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Fácil y al alcance de la mano')
    ).toBeInTheDocument();
  });
});
