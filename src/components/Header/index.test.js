import React from 'react';
import Header from '.';

describe('Header component', () => {
    it('should render', () => {
        const { container } = render(<Header />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render desktop nav on large devices', () => {
        setMatchMedia(1000);
        const { getByTestId } = render(<Header />);
        getByTestId('desktopNavList');
    });
});
