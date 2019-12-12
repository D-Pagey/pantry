import React from 'react';
import CategoryList from '.';

const props = {
    categoryCounts: [
        { category: 'Meat', count: 2 },
        { category: 'Fish', count: 3 },
        { category: 'Vegetables', count: 5 }
    ]
};

describe('CategoryList component', () => {
    it('should render', () => {
        const { container } = render(<CategoryList {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
