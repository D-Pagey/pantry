import React from 'react';
import CategoryList from '.';

const props = {
    categories: [
        { category: 'Meat', quantity: 2 },
        { category: 'Fish', quantity: 3 },
        { category: 'Vegetables', quantity: 5 }
    ]
};

describe('CategoryList component', () => {
    it('should render', () => {
        const { container } = render(<CategoryList {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
