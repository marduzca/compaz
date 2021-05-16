import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  it('renders all menu items', () => {
    render(<HeaderContainer />);

    expect(screen.getByText('DROPDOWN')).toBeInTheDocument();
    expect(screen.getByText('Header.HISTORY')).toBeInTheDocument();
    expect(screen.getByText('Header.HOW_TO_INSTALL')).toBeInTheDocument();
    expect(screen.getByText('Header.CONTACT')).toBeInTheDocument();
    expect(screen.getByText('Header.ABOUT_US')).toBeInTheDocument();
  });
});
