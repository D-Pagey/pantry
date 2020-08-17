import React from 'react';

import { render } from '../../test-utils';
import { Batches, UserDan } from '../../fixtures';
import { FoodCard } from '.';

const props = {
    batches: Batches,
    name: 'carrot',
    ownerPhoto: UserDan.photo
};

describe('FoodCard component', () => {
    it('should render', () => {
        const { container } = render(<FoodCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.todo('should sort batches by oldest first');
    it.todo('should handle too many servings');
});
