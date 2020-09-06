import React from 'react';

import { render } from '../../test-utils';
import { Batches, TenantDan, TenantJoe, TenantHeidi } from '../../fixtures';
import { FoodCard } from '.';

const props = {
    batches: Batches,
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
