import React from 'react';
import PageHome from '.';

const firebaseContext = {
    categoryCounts: [{ category: 'Meat', count: 1 }],
    fridge: [
        {
            category: { label: 'Meat', value: 'meat' },
            expires: new Date(2010, 1, 5),
            name: 'steak',
            servings: 2
        }
    ]
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome />, firebaseContext);
        expect(container.firstChild).toMatchSnapshot();
    });
});
