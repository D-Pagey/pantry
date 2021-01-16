import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils';
import { colours } from '../../tokens';
import { CategoryButton } from '.';

const props = {
    handleClick: () => null,
    name: 'meat'
};

describe('CategoryButton component', () => {
    it('should render', () => {
        const { container } = render(<CategoryButton {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onClick when clicked', () => {
        const handleClick = jest.fn();

        render(<CategoryButton {...props} handleClick={handleClick} />);

        userEvent.click(screen.getByText('Meat'));

        expect(handleClick).toHaveBeenCalled();
    });

    it('should have selected styles if prop is selected', () => {
        render(<CategoryButton {...props} isSelected />);

        expect(screen.getByText('Meat')).toHaveStyleRule('color', colours.white);
        expect(screen.getByTestId('categoryCardmeat')).toHaveStyleRule('background-color', colours.darkGreen100);
    });
});
