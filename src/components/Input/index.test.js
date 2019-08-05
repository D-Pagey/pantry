import React from 'react';
import userEvent from '@testing-library/user-event';
import Input from '.';

const props = {
    name: 'test',
    onBlur: () => {},
    onChange: () => {},
    testId: 'testInput',
    value: ''
};

describe('Input component', () => {
    it('should render', () => {
        const { container } = render(<Input {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should show error', () => {
        const error = 'Required';
        const { getByText } = render(<Input {...props} error={error} />);
        const errorMessage = getByText(error);

        expect(errorMessage).toHaveStyleRule('color', 'red');
    });

    it('should show label', () => {
        const label = 'Name';
        const { getByText } = render(<Input {...props} label={label} />);
        getByText(label);
    });

    it('should handle change', () => {
        const onChange = jest.fn();
        const { getByTestId } = render(<Input {...props} onChange={onChange} />);

        userEvent.type(getByTestId('testInput'), 'testing onchange');

        expect(onChange).toHaveBeenCalled();
    });
});
