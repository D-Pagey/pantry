import React from 'react';
import GridRows from '.';

const props = {
    data: [
        {
            category: { label: 'Meat', value: 'meat' },
            expires: '01/01/2000',
            name: 'carrots',
            servings: '2'
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
