import React from 'react';
import CategoryList from '.';

const firebaseContext = {
    categoryCounts: [
        { category: 'Meat', count: 2 },
        { category: 'Fish', count: 3 },
        { category: 'Vegetables', count: 5 }
    ]
};

describe('CategoryList component', () => {
    it('should render', () => {
        const { container } = render(<CategoryList />, firebaseContext);
        expect(container.firstChild).toMatchSnapshot();
    });
});
