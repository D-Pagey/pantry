import React from 'react';
import Header from '.';

describe('Header component', () => {
    it('should render', () => {
        const { container } = render(<Header />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
