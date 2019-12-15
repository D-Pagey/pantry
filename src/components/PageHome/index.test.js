import React from 'react';
import PageHome from '.';

const props = {
    categoryCounts: [{ category: 'Meat', count: 1 }]
};

const context = {
    isAuthed: false
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render category list if authed', () => {
        const { getByTestId } = render(<PageHome {...props} />, { isAuthed: true });
        getByTestId('categoryList');
    });
});
