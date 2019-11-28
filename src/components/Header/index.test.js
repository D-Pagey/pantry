import React from 'react';
import Header from '.';

const props = {
    isAuthed: false,
    name: ''
};

describe('Header component', () => {
    it('should render', () => {
        const { container } = render(<Header {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render desktop nav on large devices', () => {
        setMatchMedia(1000);
        const { getByTestId } = render(<Header {...props} />);
        getByTestId('desktopNavList');
    });
});
