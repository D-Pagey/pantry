import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../test-utils';
import { Fridge, TenantHeidi, TenantJoe, UserDan } from '../../fixtures';
import { EditFoodServings } from '.';

const props = {
    dispatch: () => null,
    item: Fridge[0],
    tenants: [TenantHeidi]
};

const context = {
    user: UserDan
};

const item = {
    batches: [
        {
            id: '1111111',
            expires: new Date(),
            ownerId: TenantJoe.uid,
            quantity: 1
        }
    ],
    category: 'vegetables',
    name: 'asparagus',
    unit: 'servings'
};

describe('EditFoodServings component', () => {
    it('should render', () => {
        const { container } = render(<EditFoodServings {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call handleDelete when clicking delete button', () => {
        const dispatch = jest.fn();
        render(<EditFoodServings {...props} item={item} dispatch={dispatch} />, context);

        // click the first batch that has servings > 1
        userEvent.click(screen.getAllByTestId('deleteServing')[0]);

        expect(dispatch).toHaveBeenCalledWith({ batchId: '1111111', type: 'DECREMENT_BATCH_QUANTITY' });
    });
});
