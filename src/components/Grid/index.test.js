import React from 'react';
import dateFns from 'date-fns';
import Grid from '.';

const props = {
    data: [
        {
            category: { label: 'Meat', value: 'meat' },
            expires: dateFns.format(new Date(2019, 2, 14), 'MM/DD/YYYY'),
            name: 'chicken',
            servings: '2'
        },
        {
            category: { label: 'Fish', value: 'fish' },
            expires: dateFns.format(new Date(2019, 3, 9), 'MM/DD/YYYY'),
            name: 'salmon',
            servings: '1'
        },
        {
            category: { label: 'Vegetables', value: 'vegetables' },
            expires: dateFns.format(new Date(2014, 6, 11), 'MM/DD/YYYY'),
            name: 'carrots',
            servings: '3'
        }
    ]
};

describe('Grid component', () => {
    it('should render', () => {
        const { container } = render(<Grid {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
