import React from 'react';
import { AddFoodForm2 } from '.';

const context = {
    categories: ['11', '22', '33']
};

describe('AddFoodForm2 component', () => {
    it('should render', () => {
        const { container } = render(<AddFoodForm2 />, context);
        expect(container.firstChild).toMatchSnapshot();
    });
}); 