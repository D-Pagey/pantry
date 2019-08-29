import React from 'react';
import MobileNavbar from '.';

const props = {};

describe('MobileNavbar', () => {
    it('should render', () => {
        const { container } = render(<MobileNavbar {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
