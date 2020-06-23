import React from 'react';
import { render } from '../../test-utils';
import { PageNotFound } from '.';

describe('PageNotFound component', () => {
    it('should render', () => {
        const { container } = render(<PageNotFound />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
