import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { CategoryButton } from '.';

const props = {
    handleClick: () => {},
    name: 'meat'
};

describe('CategoryButton component', () => {
    it('should render', () => {
        const { container } = render(<CategoryButton {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onClick when clicked', () => {
        const handleClick = jest.fn();

        const { getByText } = render(<CategoryButton {...props} handleClick={handleClick} />);

        userEvent.click(getByText('Meat'));

        expect(handleClick).toHaveBeenCalled();
    });
});