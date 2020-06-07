import React from 'react';
import { FoodCard } from '.';

const props = {
    date: new Date(),
    name: 'carrots'
};

describe('FoodCard component', () => {
    it('should render', () => {
        const { container } = render(<FoodCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});