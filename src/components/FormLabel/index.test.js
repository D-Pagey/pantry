import React from 'react';
import { FormLabel } from '.';

describe('FormLabel component', () => {
    it('should render', () => {
        const { container } = render(<FormLabel>Label</FormLabel>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
