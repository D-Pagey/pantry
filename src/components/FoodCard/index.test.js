import React from 'react';
import { Batches } from '../../fixtures';
import { FoodCard } from '.';

const props = {
    batches: Batches,
    name: 'carrots'
};

describe('FoodCard component', () => {
    it('should render', () => {
        const { container } = render(<FoodCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.todo('should sort batches by oldest first');
});