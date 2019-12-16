import React from 'react';
import PageHome from '.';

const props = {};

const context = {
    categoryCounts: [{ category: 'Meat', count: 1 }],
    isAuthed: false
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render category list if authed', () => {
        const { getByTestId } = render(<PageHome {...props} />, { ...context, isAuthed: true });
        getByTestId('categoryList');
    });
});
