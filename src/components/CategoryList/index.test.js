import React from 'react';
import CategoryList from '.';

const props = {};

const context = {
    categories: [
        { label: 'Meat', colour: 'red', count: 2 },
        { label: 'Fish', colour: 'red', count: 3 },
        { label: 'Vegetables', colour: 'red', count: 5 }
    ]
};

describe('CategoryList component', () => {
    it('should render', () => {
        const { container } = render(<CategoryList {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });
});
