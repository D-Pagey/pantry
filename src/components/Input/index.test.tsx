import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { Input } from '.';

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

    it('should handle change', async () => {
        const onChange = jest.fn();
        const { getByTestId } = render(<Input {...props} onChange={onChange} />);

        await userEvent.type(getByTestId('testInput'), 'testing onchange');

        expect(onChange).toHaveBeenCalled();
    });
});
