import React from 'react';
import Dropdown from '.';

const props = {
    options: [
        {
            label: 'Meat',
            value: 'meat'
        },
        {
            label: 'Vegetables',
            value: 'vegetables'
        },
        {
            label: 'Fish',
            value: 'fish'
        }
    ]
};

describe('Dropdown component', () => {
    it('should render', () => {
        const { container } = render(<Dropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a label', () => {
        const label = 'What food category is it?';
        const { getByText } = render(<Dropdown {...props} label={label} />);
        getByText(label);
    });
});
