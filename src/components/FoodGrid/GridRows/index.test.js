import React from 'react';
import GridRows from '.';

const props = {
    data: [
        {
            category: { label: 'Meat', value: 'meat' },
            expires: new Date(2019, 3, 9),
            name: 'carrots',
            servings: { label: '2', value: '2' }
        }
    ],
    handleDelete: () => {}
};

describe('GridRows component', () => {
    it('should render', () => {
        const { container } = render(<GridRows {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
