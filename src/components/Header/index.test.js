import React from 'react';
import Header from '.';

const context = {
    isAuthed: false,
    name: ''
};

describe('Header component', () => {
    it('should render', () => {
        const { container } = render(<Header />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render desktop nav on large devices', () => {
        setMatchMedia(1000);
        const { getByTestId } = render(<Header />, context);
        getByTestId('desktopNavList');
    });

    it('should render a users name if authed', () => {
        setMatchMedia(1000);
        const updatedContext = {
            isAuthed: true,
            name: 'Dan'
        };

        const { getByTestId } = render(<Header />, { ...context, ...updatedContext });
        getByTestId('headerProfileLink');
    });
});
