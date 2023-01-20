import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpandableButton from './ExpandableButton';

describe('ExpandableButton', () => {
  it('should update the aria-expanded property correctly', async () => {
    render(
      <ExpandableButton
        onClick={() => {}}
        icon={<span>icon</span>}
        accessibleName="Menu button"
      />
    );

    const expandableButton = screen.getByRole('button', {
      name: 'Menu button',
    });

    expect(expandableButton).toHaveAttribute('aria-haspopup', 'true');

    await userEvent.click(expandableButton);

    expect(expandableButton).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(expandableButton);

    expect(expandableButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('triggers onClick handler when clicking', async () => {
    const onClickMock = jest.fn();

    render(
      <ExpandableButton
        onClick={onClickMock}
        icon={<span>icon</span>}
        accessibleName="Menu button"
      />
    );

    const expandableButton = screen.getByRole('button');

    await userEvent.click(expandableButton);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
