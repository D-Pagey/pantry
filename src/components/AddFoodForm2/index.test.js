import React from 'react';
import { AddFoodForm2 } from '.';

describe('AddFoodForm2 component', () => {
    it('should render', () => {
        const { container } = render(<AddFoodForm2 />);
        expect(container.firstChild).toMatchSnapshot();
    });
});