import React from 'react';
import PageProfile from '.';

const props = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signOut: () => {}
};

const context = {
    isAuthed: true,
    user: {
        email: 'dan@gmail.com',
        name: 'Dan'
    }
};

describe('PageProfile component', () => {
    it('should render', () => {
        const { container } = render(<PageProfile {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });
});
