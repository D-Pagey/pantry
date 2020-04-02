import React from 'react';
import { FormError } from '.';

describe('FormError component', () => {
    it('should render', () => {
        const { container } = render(<FormError>Label</FormError>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
