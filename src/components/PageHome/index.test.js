import React from 'react';
import PageHome from '.';

const firestore = {
    value: {
        fridge: [
            {
                category: { label: 'Meat', value: 'meat' },
                expires: '01/01/2000',
                name: 'steak',
                servings: '2'
            }
        ]
    }
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome />, firestore);
        expect(container.firstChild).toMatchSnapshot();
    });
});
