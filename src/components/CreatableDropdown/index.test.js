import React from 'react';
import CreatableDropdown from '.';

const props = {
    options: [
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' }
    ],
    setSelected: () => {}
};

describe('CreatableDropdown component', () => {
    it('should render', () => {
        const { container } = render(<CreatableDropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a label', () => {
        const label = 'What food category is it?';
        const { getByText } = render(<CreatableDropdown {...props} label={label} />);
        getByText(label);
    });

    it('should render an error', () => {
        const error = 'What food category is it?';
        const { getByText } = render(<CreatableDropdown {...props} error={error} />);
        getByText(error);
    });
});
