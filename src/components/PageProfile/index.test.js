import React from 'react';
import PageProfile from '.';

const props = {
    email: 'dan@gmail.com',
    name: 'Dan'
};

describe('PageProfile component', () => {
    it('should render', () => {
        const { container } = render(<PageProfile {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
