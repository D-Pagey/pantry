import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../test-utils';
import { deleteBatch, updateBatch } from '../../services/firestore';
import { Fridge, TenantHeidi, TenantJoe, UserDan } from '../../fixtures';
import { EditFoodServings } from '.';

jest.mock('../../services/firestore');

const props = {
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

    it('should call deleteBatch when clicking delete button', () => {
        render(<EditFoodServings {...props} item={item} />, context);

        // click the first batch that has servings > 1
        userEvent.click(screen.getAllByTestId('deleteServing')[0]);

        expect(deleteBatch).toHaveBeenCalledWith({
            batchId: item.batches[0].id,
            name: item.name,
            userHousehold: context.user.household
        });
    });

    it('should call updateBatch when clicking delete button', () => {
        const multipleServings = {
            ...item,
            batches: [
                {
                    ...item.batches[0],
                    quantity: 4
                }
            ]
        };

        render(<EditFoodServings {...props} item={multipleServings} />, context);

        // click the first batch that has servings > 1
        userEvent.click(screen.getAllByTestId('deleteServing')[0]);

        expect(updateBatch).toHaveBeenCalledWith({
            name: item.name,
            userHousehold: context.user.household,
            batch: {
                ...item.batches[0],
                quantity: 3
            }
        });
    });
});
