import React from 'react';
import BurgerMenu from '.';

describe('BurgerMenu component', () => {
    it('should render', () => {
        const { container } = render(<BurgerMenu />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.todo('should close on click');
});
