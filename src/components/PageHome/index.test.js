import React from 'react';
import PageHome from '.';

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
