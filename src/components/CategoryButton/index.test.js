import React from 'react';
import userEvent from '@testing-library/user-event';
import { CategoryButton } from '.';

const props = {
    name: 'meat'
};

describe('CategoryButton component', () => {
    it('should render', () => {
        const { container } = render(<CategoryButton {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onClick when clicked', () => {
        const onClick = jest.fn();

        const { getByText } = render(<CategoryButton {...props} onClick={onClick} />);

        userEvent.click(getByText('Meat'));

        expect(onClick).toHaveBeenCalled();
    });
});