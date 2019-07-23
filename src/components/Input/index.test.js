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
});
