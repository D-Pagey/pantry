import React from 'react';

import { render } from '../../test-utils';
import { Batches, User } from '../../fixtures';
import { FoodCard } from '.';

const props = {
    batches: Batches,
    name: 'carrot',
    ownerPhoto: User.photo
};

describe('FoodCard component', () => {
    it('should render', () => {
        const { container } = render(<FoodCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.todo('should sort batches by oldest first');
});
