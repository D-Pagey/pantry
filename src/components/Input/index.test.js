import React from 'react';
import Input from '.';

const props = {
    testId: 'testInput'
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
});
