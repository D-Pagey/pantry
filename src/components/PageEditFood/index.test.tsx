import React from 'react';
import { render } from '../../test-utils';
import { PageEditFood } from '.';

describe('PageEditFood component', () => {
    // TODO: mock location state
    it('should render', () => {
        const { container } = render(<PageEditFood />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
