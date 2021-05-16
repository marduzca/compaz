import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterContainer from './FooterContainer';

describe('FooterContainer', () => {
  it('renders all footer items', () => {
    render(<FooterContainer />);

    expect(screen.getByText('Footer.GUIDE')).toBeInTheDocument();
    expect(screen.getByText('Footer.TIME')).toBeInTheDocument();
    expect(screen.getByText('Footer.EASY')).toBeInTheDocument();
  });
});
