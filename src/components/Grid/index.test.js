import React from 'react';
import Grid from '.';

const props = {
    data: [
        {
            category: 'meat',
            name: 'chicken',
            serves: 2
        },
        {
            category: 'fish',
            name: 'salmon',
            serves: 1
        },
        {
            category: 'vegetables',
            name: 'carrots',
            serves: 3
        }
    ]
};

describe('Grid component', () => {
    it('should render', () => {
        const { container } = render(<Grid {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
