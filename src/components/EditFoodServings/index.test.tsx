import React from 'react';

import { render } from '../../test-utils';
import { Fridge, TenantHeidi } from '../../fixtures';
import { EditFoodServings } from '.';

const props = {
    item: Fridge[0],
    tenants: [TenantHeidi],
    updateBatch: () => {}
};

describe('EditFoodServings component', () => {
    it('should render', () => {
        const { container } = render(<EditFoodServings {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
