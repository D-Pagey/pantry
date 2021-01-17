import React from 'react';
import { render } from '../../test-utils';
import { PageAlexa } from '.';

describe('PageAlexa component', () => {
    it('should render', () => {
        const { container } = render(<PageAlexa />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
