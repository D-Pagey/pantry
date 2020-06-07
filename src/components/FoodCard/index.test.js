import React from 'react';
import { FoodCard } from '.';

describe('FoodCard component', () => {
    it('should render', () => {
        const { container } = render(<FoodCard />);
        expect(container.firstChild).toMatchSnapshot();
    });
});