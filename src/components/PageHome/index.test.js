import React from 'react';
import PageHome from '.';

const firestore = {
    fridge: [
        {
            category: { label: 'Meat', value: 'meat' },
            expires: new Date(2010, 1, 5),
            name: 'steak',
            servings: { label: '2', value: '2' }
        }
    ]
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome />, firestore);
        expect(container.firstChild).toMatchSnapshot();
    });
});
