import React from 'react';

import { render } from '../../test-utils';
import { Fridge, TenantDan, TenantJoe, TenantHeidi } from '../../fixtures';
import { FoodCard } from '.';

const props = {
    item: Fridge[0],
    name: 'carrot',
    tenants: [TenantDan, TenantJoe, TenantHeidi]
};

describe('FoodCard component', () => {
    it('should render', () => {
        const { container } = render(<FoodCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.todo('should sort batches by oldest first');
    it.todo('should handle too many servings');
});
